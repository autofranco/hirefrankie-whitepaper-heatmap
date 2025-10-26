/**
 * Calculate total time spent in each section per topic_id
 *
 * @param {Array} events - Array of event objects
 * @returns {Array} Array of aggregated time data per topic_id
 */
function getSectionTimes(events) {
    const eventsByTopic = groupEventsByTopic(events);
    return Object.keys(eventsByTopic).map(topicId =>
        calculateTopicSectionTimes(topicId, eventsByTopic[topicId])
    );
}

/**
 * Group events by topic_id
 */
function groupEventsByTopic(events) {
    const grouped = {};
    events.forEach(event => {
        if (!grouped[event.topic_id]) {
            grouped[event.topic_id] = [];
        }
        grouped[event.topic_id].push(event);
    });
    return grouped;
}

/**
 * Calculate section times for a single topic
 */
function calculateTopicSectionTimes(topicId, events) {
    const sortedEvents = sortEventsByTimestamp(events);
    const totalTimes = processEvents(sortedEvents);

    return {
        topic_id: topicId,
        section_1_total_time: roundToThreeDecimals(totalTimes[1]),
        section_2_total_time: roundToThreeDecimals(totalTimes[2]),
        section_3_total_time: roundToThreeDecimals(totalTimes[3])
    };
}

/**
 * Sort events by created_at timestamp
 */
function sortEventsByTimestamp(events) {
    return events.sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
}

/**
 * Process events and calculate total time per section
 */
function processEvents(events) {
    const enterTimes = { 1: null, 2: null, 3: null };
    const totalTimes = { 1: 0, 2: 0, 3: 0 };

    events.forEach(event => {
        const { action, sectionNumber } = parseEvent(event);
        if (!action || !sectionNumber) return;

        if (action === 'enter') {
            handleEnterEvent(enterTimes, sectionNumber, event.created_at);
        } else if (action === 'exit') {
            handleExitEvent(enterTimes, totalTimes, sectionNumber, event.created_at);
        }
    });

    return totalTimes;
}

/**
 * Parse event string to extract action and section number
 */
function parseEvent(event) {
    const match = event.event.match(/(enter|exit) section (\d+)/);
    if (!match) return {};

    return {
        action: match[1],
        sectionNumber: parseInt(match[2])
    };
}

/**
 * Handle enter event - store timestamp
 */
function handleEnterEvent(enterTimes, sectionNumber, timestamp) {
    enterTimes[sectionNumber] = new Date(timestamp).getTime();
}

/**
 * Handle exit event - calculate duration if paired with enter
 */
function handleExitEvent(enterTimes, totalTimes, sectionNumber, timestamp) {
    if (enterTimes[sectionNumber] === null) return;

    const exitTime = new Date(timestamp).getTime();
    const duration = (exitTime - enterTimes[sectionNumber]) / 1000;

    totalTimes[sectionNumber] += duration;
    enterTimes[sectionNumber] = null;
}

/**
 * Round number to 3 decimal places
 */
function roundToThreeDecimals(num) {
    return Math.round(num * 1000) / 1000;
}

// For n8n usage
// const events = $input.all().map(item => item.json);
// return getSectionTimes(events);

// For Node.js/module export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = getSectionTimes;
}
