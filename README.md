# White Paper Heatmap Tracker

An HTML-based white paper reader that tracks user engagement by monitoring time spent in different sections.

## Overview

This project provides HTML code designed for an n8n 'Response to Webhook' node. It displays a white paper divided into 3 sections and tracks user reading behavior by sending notifications to an n8n webhook whenever users enter or leave each section.

## How It Works

1. **Display**: Shows a white paper with 3 distinct sections
2. **Tracking**: Monitors when users enter and exit each section using Intersection Observer API
3. **Analytics**: Sends real-time notifications to n8n webhook for each section event
4. **Insights**: n8n workflow processes notifications to calculate and rank sections by time spent, revealing user interests

## Use Cases

- Understanding which topics resonate most with readers
- Optimizing content based on engagement data
- Identifying drop-off points in long-form content
- A/B testing different white paper sections

## Setup

The HTML will be deployed via n8n's webhook response, allowing seamless integration with n8n workflows for data collection and analysis.