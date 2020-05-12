// --- style ---
import '../scss/app.scss';

import 'bootstrap';
import './navbar.js';

// --- assets ---
import '../assets/favIcon.ico';

$(window).on('load', function() { 
    $('body').removeClass("blockTransitions");
});