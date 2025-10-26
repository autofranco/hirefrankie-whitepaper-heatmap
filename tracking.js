// Whitepaper Section Tracking Script
// Tracks when readers enter/exit sections and sends events to webhook

(function() {
    'use strict';

    const WEBHOOK_URL = 'https://hirefrankie.zeabur.app/webhook-test/28128c26-8a94-46c5-b99f-f26eff4e5336';
    const THRESHOLD = 0.5; // 50% of section must be visible

    // Track current state of each section to avoid duplicate events
    const sectionStates = new Map();

    /**
     * Send event to webhook
     * @param {string} event - Event description (e.g., "enter section 1")
     * @param {number} sectionNumber - Section number
     */
    function sendEvent(event, sectionNumber) {
        const payload = {
            event: event,
            section: sectionNumber,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        // Send as POST request with JSON payload
        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            // Use keepalive to ensure request completes even if page is closing
            keepalive: true
        }).catch(error => {
            console.error('Webhook error:', error);
        });

        console.log('📊 Tracking event:', event);
    }

    /**
     * Handle section visibility changes
     * @param {IntersectionObserverEntry[]} entries
     */
    function handleIntersection(entries) {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const sectionNumber = parseInt(sectionId.replace('section-', ''));
            const isIntersecting = entry.isIntersecting;
            const currentState = sectionStates.get(sectionId);

            // Only send event if state has changed
            if (currentState !== isIntersecting) {
                const event = isIntersecting
                    ? `enter section ${sectionNumber}`
                    : `exit section ${sectionNumber}`;

                sendEvent(event, sectionNumber);
                sectionStates.set(sectionId, isIntersecting);
            }
        });
    }

    /**
     * Initialize tracking when DOM is ready
     */
    function initTracking() {
        // Find all sections
        const sections = document.querySelectorAll('.section[id^="section-"]');

        if (sections.length === 0) {
            console.warn('No sections found for tracking');
            return;
        }

        // Create Intersection Observer
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: THRESHOLD,
            // Add some margin to trigger slightly before/after exact threshold
            rootMargin: '0px'
        });

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
            // Initialize state as false (not visible)
            sectionStates.set(section.id, false);
        });

        console.log(`📊 Tracking initialized for ${sections.length} sections`);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTracking);
    } else {
        initTracking();
    }

    // Track page unload (when user leaves the page)
    window.addEventListener('beforeunload', () => {
        // Send exit events for any sections currently being viewed
        sectionStates.forEach((isVisible, sectionId) => {
            if (isVisible) {
                const sectionNumber = parseInt(sectionId.replace('section-', ''));
                sendEvent(`exit section ${sectionNumber}`, sectionNumber);
            }
        });
    });
})();
