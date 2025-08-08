import { useEffect } from 'react';

export function useCollapsibleSections() {
  useEffect(() => {
    const initCollapsible = () => {
      const apiReference = document.querySelector('.apiReference');
      if (!apiReference) return;

      // Find all h4 elements (method/property titles)
      const h4Elements = apiReference.querySelectorAll('h4');
      
      h4Elements.forEach(h4 => {
        // Skip if already processed
        if (h4.classList.contains('collapsible-processed')) return;
        
        // Mark as processed
        h4.classList.add('collapsible-processed');
        
        // Create wrapper for collapsible content
        const wrapper = document.createElement('div');
        wrapper.className = 'collapsible-wrapper';
        
        // Create content container
        const content = document.createElement('div');
        content.className = 'collapsible-content expanded';
        
        // Collect all sibling elements until the next h2, h3, or h4
        const siblings = [];
        let sibling = h4.nextElementSibling;
        
        while (sibling && !['H2', 'H3', 'H4'].includes(sibling.tagName)) {
          siblings.push(sibling);
          sibling = sibling.nextElementSibling;
        }
        
        // Move siblings into content container
        siblings.forEach(el => {
          content.appendChild(el);
        });
        
        // Insert wrapper after h4
        h4.parentNode.insertBefore(wrapper, h4.nextSibling);
        wrapper.appendChild(content);
        
        // Add toggle button to h4
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'collapsible-toggle';
        toggleBtn.innerHTML = '<svg class="toggle-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>';
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Toggle section');
        
        // Insert toggle button at the beginning of h4
        h4.insertBefore(toggleBtn, h4.firstChild);
        
        // Make h4 clickable
        h4.style.cursor = 'pointer';
        
        // Toggle functionality
        const toggleSection = (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const isExpanded = content.classList.contains('expanded');
          
          if (isExpanded) {
            content.classList.remove('expanded');
            content.classList.add('collapsed');
            toggleBtn.classList.add('collapsed');
            toggleBtn.setAttribute('aria-expanded', 'false');
          } else {
            content.classList.remove('collapsed');
            content.classList.add('expanded');
            toggleBtn.classList.remove('collapsed');
            toggleBtn.setAttribute('aria-expanded', 'true');
          }
        };
        
        // Add click handlers
        toggleBtn.addEventListener('click', toggleSection);
        h4.addEventListener('click', toggleSection);
        
        // Prevent link navigation when clicking the h4
        const anchor = h4.querySelector('a');
        if (anchor) {
          anchor.addEventListener('click', (e) => {
            if (e.target === anchor) {
              e.stopPropagation();
            }
          });
        }
      });
      
      // Add option to collapse/expand all
      const controlsContainer = document.createElement('div');
      controlsContainer.className = 'collapsible-controls';
      controlsContainer.innerHTML = `
        <button class="expand-all-btn">Expand All</button>
        <button class="collapse-all-btn">Collapse All</button>
      `;
      
      const firstH2 = apiReference.querySelector('h2');
      if (firstH2) {
        firstH2.parentNode.insertBefore(controlsContainer, firstH2);
      }
      
      // Expand all functionality
      const expandAllBtn = controlsContainer.querySelector('.expand-all-btn');
      expandAllBtn?.addEventListener('click', () => {
        apiReference.querySelectorAll('.collapsible-content').forEach(content => {
          content.classList.remove('collapsed');
          content.classList.add('expanded');
        });
        apiReference.querySelectorAll('.collapsible-toggle').forEach(btn => {
          btn.classList.remove('collapsed');
          btn.setAttribute('aria-expanded', 'true');
        });
      });
      
      // Collapse all functionality
      const collapseAllBtn = controlsContainer.querySelector('.collapse-all-btn');
      collapseAllBtn?.addEventListener('click', () => {
        apiReference.querySelectorAll('.collapsible-content').forEach(content => {
          content.classList.remove('expanded');
          content.classList.add('collapsed');
        });
        apiReference.querySelectorAll('.collapsible-toggle').forEach(btn => {
          btn.classList.add('collapsed');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    };
    
    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initCollapsible, 100);
    
    // Re-initialize on route changes
    const observer = new MutationObserver(() => {
      const apiReference = document.querySelector('.apiReference');
      if (apiReference && !apiReference.querySelector('.collapsible-controls')) {
        initCollapsible();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}