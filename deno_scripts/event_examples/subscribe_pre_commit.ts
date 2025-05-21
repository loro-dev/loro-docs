// Import Loro an LoroList from the loro-wasm package
import { Loro, LoroList } from "npm:loro-wasm@0.15.0-alpha.1";

async function main() {
  // Create a new Loro document
  const doc = new Loro();

  // Get a LoroList named 'myList'
  const list = doc.getList("myList");

  // Subscribe to the preCommit event.
  // This callback will be executed just before any transaction is committed.
  const subId = doc.subscribePreCommit((event) => {
    console.log("[PreCommit Event] Triggered just before commit.");
    
    // Example: Make a small modification within the preCommit callback.
    // Here, we add an element to the list.
    // This modification will be part of the same transaction that is about to be committed.
    list.push("item_from_pre_commit_callback");
    console.log("[PreCommit Event] Added 'item_from_pre_commit_callback' to the list.");
    // Note: The 'event' object in preCommit might be minimal or undefined
    // depending on the Loro version. Check Loro's API docs for details.
    // console.log("[PreCommit Event] Event details:", event);
  });

  console.log("Initial list (before first commit):", list.toJSON());

  // Make an initial modification to the list
  list.insert(0, "initial_item");
  console.log("List after insertion, before commit:", list.toJSON());

  // Commit the transaction. This will trigger the preCommit event callback.
  console.log("Committing transaction...");
  doc.commit();

  // Events are emitted asynchronously after a microtask.
  // Wait for event processing.
  await new Promise(resolve => setTimeout(resolve, 0));

  console.log("List after first commit (should include item from preCommit):", list.toJSON());

  // Further modifications
  list.push("another_item");
  console.log("List after pushing 'another_item', before second commit:", list.toJSON());
  
  // Commit again
  console.log("Committing second transaction...");
  doc.commit();
  await new Promise(resolve => setTimeout(resolve, 0));

  console.log("List after second commit (should include another item from preCommit):", list.toJSON());

  // Unsubscribe from the event
  doc.unsubscribe(subId);
  console.log("Unsubscribed from preCommit event.");

  // This commit will not trigger the callback
  list.push("final_item");
  doc.commit();
  await new Promise(resolve => setTimeout(resolve, 0));
  console.log("List after unsubscribing and committing:", list.toJSON());
}

main().catch(console.error);
