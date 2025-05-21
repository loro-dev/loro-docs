// Import Loro from the loro-wasm package
import { Loro, LoroText } from "npm:loro-wasm@0.15.0-alpha.1";

async function main() {
  // Create the first Loro document (peer A)
  const docA = new Loro();
  docA.setPeerId("peerA"); // Set a unique peer ID for docA
  console.log("docA initialized with peerId:", docA.peerIdStr);

  // Keep track of peers whose first commit has been processed
  const processedPeers = new Set<string>();

  // Subscribe to the firstCommitFromPeer event on docA.
  // This callback is triggered only when the very first commit from a specific
  // remote peer is successfully applied to docA.
  const subId = docA.subscribeFirstCommitFromPeer((event) => {
    // The event object should contain the peerId of the originating peer.
    // Note: The exact structure of the event object (e.g., event.peerId)
    // should be confirmed with Loro's API documentation for the specific version.
    // For this example, we'll assume `event.id` holds the peer ID.
    // Based on common patterns, it might also be `event.peer` or `event.origin`.
    // Let's try to infer it or use a placeholder.
    // Looking at Loro's Rust code, events usually have `origin` for peer_id_str.
    // The event type for `Commit` has `origin: PeerIDStr`.
    // Let's assume the event structure for `firstCommitFromPeer` will provide the remote peer's ID.
    // We'll use a placeholder `event.remotePeerId` and adjust if Loro's actual event is different.
    // Actual event payload for `loro_event_type::LoroEvent::Commit` has `origin: PeerIDStr`.
    // The `RawEvent` has `origin_peer: Option<PeerID>`.
    // Let's assume the callback receives an object with an `origin` field.
    
    const remotePeerId = event.origin; // Assuming 'origin' holds the string PeerID

    if (remotePeerId && remotePeerId !== docA.peerIdStr) {
      console.log(`[DocA - FirstCommitEvent] Received FIRST commit from peer: ${remotePeerId}`);
      processedPeers.add(remotePeerId);
      // You can initialize peer-specific state or UI here.
    } else if (remotePeerId === docA.peerIdStr) {
      console.log(`[DocA - FirstCommitEvent] Ignoring commit from self (peer: ${remotePeerId})`);
    } else {
      console.warn("[DocA - FirstCommitEvent] Received event but remotePeerId is missing or undefined.", event);
    }
  });

  console.log("docA subscribed to firstCommitFromPeer event.");

  // Create a second Loro document (peer B)
  const docB = new Loro();
  docB.setPeerId("peerB"); // Set a unique peer ID for docB
  console.log("docB initialized with peerId:", docB.peerIdStr);
  const textB = docB.getText("sharedText");

  // Peer B makes a commit
  textB.insert(0, "Hello from Peer B!");
  docB.commit();
  console.log("docB (Peer B) made its first commit.");

  // Export changes from docB (all changes since docA's version, which is empty initially)
  const updatesFromB = docB.exportFrom(docA.version());
  console.log(`docB exported ${updatesFromB.byteLength} bytes of updates for docA.`);

  // docA imports changes from docB
  // This should trigger the firstCommitFromPeer event for "peerB"
  console.log("docA importing updates from docB...");
  docA.import(updatesFromB);
  await new Promise(resolve => setTimeout(resolve, 0)); // Wait for event processing

  console.log("docA current text:", docA.getText("sharedText").toString());
  if (processedPeers.has("peerB")) {
    console.log("Verified: 'peerB' was processed by firstCommitFromPeer callback.");
  } else {
    console.error("Error: 'peerB' was NOT processed by firstCommitFromPeer callback as expected.");
  }

  // Peer B makes another commit
  textB.insert(textB.length, " More text from B.");
  docB.commit();
  console.log("docB (Peer B) made a second commit.");

  // Export changes from docB again
  const updatesFromB2 = docB.exportFrom(docA.version()); // version of docA has been updated
  console.log(`docB exported ${updatesFromB2.byteLength} bytes for its second update.`);

  // docA imports the second batch of changes from docB
  // This should NOT trigger the firstCommitFromPeer event again for "peerB"
  console.log("docA importing second set of updates from docB...");
  docA.import(updatesFromB2);
  await new Promise(resolve => setTimeout(resolve, 0)); // Wait for event processing

  console.log("docA current text after second import from B:", docA.getText("sharedText").toString());

  // Create a third Loro document (peer C)
  const docC = new Loro();
  docC.setPeerId("peerC");
  console.log("docC initialized with peerId:", docC.peerIdStr);
  const textC = docC.getText("sharedText"); // Use the same text key for merging

  // Peer C makes a commit
  textC.insert(0, "Greetings from Peer C! ");
  docC.commit();
  console.log("docC (Peer C) made its first commit.");

  // Export changes from docC
  const updatesFromC = docC.exportFrom(docA.version());
  console.log(`docC exported ${updatesFromC.byteLength} bytes of updates for docA.`);
  
  // docA imports changes from docC
  // This should trigger the firstCommitFromPeer event for "peerC"
  console.log("docA importing updates from docC...");
  docA.import(updatesFromC);
  await new Promise(resolve => setTimeout(resolve, 0)); // Wait for event processing

  console.log("docA current text after import from C:", docA.getText("sharedText").toString());
   if (processedPeers.has("peerC")) {
    console.log("Verified: 'peerC' was processed by firstCommitFromPeer callback.");
  } else {
    console.error("Error: 'peerC' was NOT processed by firstCommitFromPeer callback as expected.");
  }

  // Unsubscribe from the event
  docA.unsubscribe(subId);
  console.log("docA unsubscribed from firstCommitFromPeer event.");

  // Further imports will not trigger the callback
  const docD = new Loro();
  docD.setPeerId("peerD");
  docD.getText("sharedText").insert(0, "Hello from Peer D! ");
  docD.commit();
  const updatesFromD = docD.exportFrom(docA.version());
  docA.import(updatesFromD);
  await new Promise(resolve => setTimeout(resolve, 0));
  console.log("Imported from Peer D after unsubscribing. No event expected.");
  console.log("Final text in docA:", docA.getText("sharedText").toString());
}

main().catch(console.error);
