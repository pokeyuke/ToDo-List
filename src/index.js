   import "./styles.css";
    import { formatDistance, subDays } from "date-fns";
    import './styles.css';
    import manager from './logic.js';
    import { initializeDOM, renderApp } from './dom.js';

    const result = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
    console.log(result);

    console.log("HIIIIIII")
    