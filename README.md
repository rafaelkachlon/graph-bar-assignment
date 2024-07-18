# Task Overview

Your task is to create a comprehensive Angular application that fetches data about conference rooms and their associated labels, calculates the total capacity of conference rooms grouped by labels, and displays this information in a graph. Additionally, you will implement a filtering mechanism to allow users to select which labels to display in the graph.

## Task Breakdown

### 1. Create a GraphBar Component

**Props**: The component should accept the following props:

- `data`: An array of objects where each object has a `label` (a single capital letter) and a `value` (a non-negative number).
- `width`: A string representing the width of the graph with a "px" suffix (e.g., "100px").
- `height`: A string representing the height of the graph with a "px" suffix (e.g., "200px").

**Additional Requirements**:

- **Graph Size**: The size of the graph should be determined by the `width` and `height` props.
- **Graph Padding**: There should be a 5px padding between the graph area's border and the columns.
- **Column Height**: The height of each column should represent its value. The column with the highest value should reach the full height of the graph. Columns should have a minimum height of 5px.
- **Column Width**: Columns should have a minimum width of 15px and should be spaced 8px apart. They should fill the available graph width.
- **Labels**: Display labels on the X-axis under each column.
- **Coloring**: Cycle through a predefined set of colors for the columns.

**Color Palette**:

- Use the following color palette for the columns: `["#ff0000", "#ff8000", "#00ff80"]`.

### 2. Fetch Data

Use the provided API endpoints to fetch data about conference rooms and labels:

- `getConferenceRooms`: Fetches a list of all conference rooms.
  - Sample response:
    ```json
    [
      {
        "id": 1,
        "name": "Strawberry",
        "buildingName": "KennedyA",
        "labels": [4, 1],
        "capacity": 40,
        "hasProjector": true,
        "hasTv": true
      },
      ...
    ]
    ```
- `getLabels`: Fetches a list of all available labels.
  - Sample response:
    ```json
    [
      {
        "id": 1,
        "name": "Large",
        "parentId": null
      },
      ...
    ]
    ```

### 3. Calculate Total Capacity by Label

- Each conference room has a `capacity` attribute and an optional list of `labels`.
- Each label has a `name` and an optional `parentId`.
- Labels can have a hierarchical relationship, where a label can have child labels.
- Calculate the total capacity for each label by summing the capacities of all conference rooms associated with that label or any of its descendants.

### 4. Display the Graph

- Use the `GraphBarComponent` to display the total capacity by label.
- Ensure the graph updates correctly when the data changes.

### 5. Filter the Data

- Use a `Select` component to allow users to select labels to show in the graph.
- When no labels are selected, show all labels in the graph.
- Update the graph to reflect the selected labels.

## Summary of Steps

1. **Implement the `GraphBarComponent`**:

   - Accept `data`, `width`, and `height` props.
   - Render a bar graph with columns representing the data.
   - Ensure proper sizing, padding, column width, and height.

2. **Fetch Conference Rooms and Labels Data**:

   - Use API endpoints to fetch the data.
   - Store the data in the component state.

3. **Calculate Total Capacities**:

   - Process the fetched data to calculate total capacities by label.
   - Account for label hierarchies in the calculation.

4. **Render the Graph**:

   - Use the `GraphBarComponent` to display the processed data.
   - Ensure the graph updates when the data changes.

5. **Implement Filtering**:
   - Allow users to select labels to filter the displayed data.
   - Update the graph based on the selected labels.

By following these combined instructions, you will create an Angular application that dynamically fetches, processes, and displays data in a customizable bar graph with filtering capabilities.
