# Component Hunt Assignment

This repository contains the solution for the "Component Hunt" assignment, where the objective is to break a popular website into components and sketch its structure.

## Overview

For this assignment, I have analyzed the layout and component structure of a popular video platform (**YouTube**) and created a visual, structural wireframe ("sketch") using HTML and CSS.

### Breakdown Structure

The application's interface can be logically divided into the following nested component structure:

1. **App Root / Layout** `(<div class="app-layout">)`
    * **Header Component** `(<header class="top-bar">)`
        * Logo and Menu Component
        * Search Bar Component
        * User Actions / Profile Component
    * **Sidebar Navigation Component** `(<aside class="sidebar">)`
        * Navigation Links (Home, Shorts, Subscriptions, etc.)
    * **Main Content Area** `(<main class="content-feed">)`
        * **Category Filter Component** `(<div class="category-tags">)`
        * **Video Grid Component** `(<div class="video-grid">)`
            * **Video Card Component** `(<article class="video-card">)`
                * Video Thumbnail Wrapper Component
                * Card Metadata Component
                    * Channel Avatar Component
                    * Video Text Details (Title, Views, Date)

## Running the Project Setup

Open `index.html` in any modern web browser to view the Component Hunt sketch visually highlighting this structure.
