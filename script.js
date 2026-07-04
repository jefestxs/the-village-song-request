// ==============================================
// The Village Song Requester
// ==============================================
console.log("The Village Song Requester Loaded");

// ==============================================
// DATA

let songSummary = [];
let countrySummary = [];

const allSongs = [
    {
        id: "sp-1",
        title: "Little Miss Best Body",
        artist: "Kman 6ixx",
        platform: "Spotify",
        url: "https://open.spotify.com/track/2OjzNceywfMHQuMlNDjWJ5?si=59bcc53af2b1475d",
    },
    {
        id: "sp-2",
        title: "Body Tea",
        artist: "Malie Don",
        platform: "Spotify",
        url: "https://open.spotify.com/track/4XKImaOoG0LNPktXJEyGNA?si=addf5589433b44c8",
    },
    {
        id: "sp-3",
        title: "Turn Me On",
        artist: "Kevin Little",
        platform: "Spotify",
        url: "https://open.spotify.com/track/0RmXtDH1cBMGImRrmn5xL6?si=5cdea7b071084438",
    },
    {
        id: "sp-4",
        title: "Bend Ova",
        artist: "Kman 6ixx",
        platform: "Spotify",
        url: "https://open.spotify.com/track/1cazpbYCMJxehEyjpj7jaC?si=302a1169cdb94bbc",
    }
]

const supports = [
    {
        songId: "sp-1",
        name: "Donovan",
        country: "Trinidad and Tobago",
        email: "",
        newsletter: false,
    },
    {
        songId: "sp-2",
        name: "Alice",
        country: "Jamaica",
        email: "alice@example.com",
        newsletter: true,
    },
    {
        songId: "sp-3",
        name: "Bob",
        country: "Barbados",
        email: "",
        newsletter: false,
    },
    {
        songId: "sp-4",
        name: "Charlie",
        country: "Trinidad and Tobago",
        email: "",
        newsletter: false,
    }
]

const countryOptions = [
    {
        code: "TT",
        name: "Trinidad & Tobago"
    },
    {
        code: "JM",
        name: "Jamaica"
    },
    {
        code: "GY",
        name: "Guyana"
    }
]

// ======================================









// ==============================================
// DOM REFERENCES

// Playlist
const playlistContainer = document.getElementById("playlistContainer");
const searchInput = document.getElementById("searchInput");

// User Info
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const countrySelect = document.getElementById("countrySelect");
const emailContainer = document.getElementById("emailContainer");

// Song Request
const songLinkInput = document.getElementById("songLinkInput");
const songRequestForm = document.getElementById("songRequestForm");

// Countries
const countriesContainer = document.getElementById("countriesContainer");

// ==============================================








// ==============================================
// SUMMARY FUNCTIONS

function buildSongSummary() {

    const summary = [];

    for (const song of allSongs) {

        const songSupports = supports.filter(function (support) {

            return support.songId === song.id;

        });

        summary.push({

            id: song.id,
            title: song.title,
            artist: song.artist,
            platform: song.platform,
            supporters: songSupports.length

        });

    }

    return summary;

}


function buildCountrySummary() {

    const countryTotals = {};

    // Count supporters by country
    for (const support of supports) {

        if (countryTotals[support.country]) {

            countryTotals[support.country]++;

        } else {

            countryTotals[support.country] = 1;

        }

    }

    // Convert object into an array
    const summary = [];

    for (const countryName in countryTotals) {

        summary.push({

            name: countryName,

            supporters: countryTotals[countryName]

        });

    }

    // Sort by most supporters
    summary.sort(function (a, b) {

        return b.supporters - a.supporters;

    });

    return summary;

}

// ==============================================










// ==============================================
// RENDER FUNCTIONS

function createSongCard(song) {

    return `
        <div class="song-card">

            <div class="song-info">

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

            </div>

            <div class="request-count">

                ❤️ ${song.supporters} Requests

            </div>

        </div>
    `;

}


function renderSongs(songList) {

    playlistContainer.innerHTML = "";

    if (songList.length === 0) {
        playlistContainer.innerHTML = `
            <p class="empty-message">
                No matching songs found.
            </p>
        `;
        return;
    }

    songList.forEach(song => {
        playlistContainer.innerHTML += createSongCard(song);
    });

}

function renderCountries(countryList) {

    countriesContainer.innerHTML = "";

    if (countryList.length === 0) {
        countriesContainer.innerHTML = 
        "<p>No countries represented yet.</p>";
        return;
    }

    for (const country of countryList) {
        countriesContainer.innerHTML += `
            <div class="country-card">
                <span class="country-name">
                    ${country.name}
                </span>
                <span class="country-count">
                    ${country.supporters} Community Members
                </span>
            </div>
        `;
    }
}


function searchSongs(searchText) {

    const search = searchText.trim().toLowerCase();

    const filteredSongs = songSummary.filter(function (song) {

    return (
        song.title.toLowerCase().includes(searchText.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchText.toLowerCase())
    );
});

    renderSongs(filteredSongs);

}

function populateCountryDropdown() {

    countrySelect.innerHTML = "";

    // Default placeholder
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select your country";
    placeholder.disabled = true;
    placeholder.selected = true;
    countrySelect.appendChild(placeholder);

    // Actual countries
    for (const country of countryOptions) {

        const option = document.createElement("option");

        option.value = country.name;
        option.textContent = country.name;

        countrySelect.appendChild(option);
    }

}
// ==============================================









// ==============================================
// EVENT HANDLERS

const errorBox = document.getElementById("formError");

searchInput.addEventListener("input", function () {
    searchSongs(searchInput.value);

    // optional but useful: clear error while user is interacting
    errorBox.textContent = "";
});

songRequestForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = getFormData();
    const validation = validateForm(formData);

    if (!validation.valid) {
        errorBox.textContent = validation.message;
        return;
    }

    // clear any previous error on success
    errorBox.textContent = "";

    console.log("Form is valid!");
    console.log(formData);
});

newsletterCheckbox.addEventListener("change", function () {

    if (newsletterCheckbox.checked) {

        emailContainer.style.display = "block";

        emailInput.required = true;

    } else {

        emailContainer.style.display = "none";

        emailInput.required = false;

        emailInput.value = "";

    }

});
// ==============================================









// ==============================================
// FORM FUNCTIONS

function getFormData() {

    return {

        name: nameInput.value.trim(),

        country: countrySelect.value,

        newsletter: newsletterCheckbox.checked,
        
        email: emailInput.value.trim(),

        songLink: songLinkInput.value.trim(),

        honeypot: websiteInput.value.trim()

    };
}

function validateForm(formData) {

    if (formData.honeypot !== "") {
        return {
            valid: false,
            message: "Spam detected."
        };
    }

    if (formData.name === "") {
        return {
            valid: false,
            message: "Please enter your name."
        };
    }

    if (formData.country === "") {
        return {
            valid: false,
            message: "Please select your country."
        };
    }

    if (formData.songLink === "") {
        return {
            valid: false,
            message: "Please paste a Spotify or YouTube link."
        };
    }

    if (
        formData.newsletter &&
        formData.email === ""
    ) {
        return {
            valid: false,
            message: "An email address is required to join the newsletter."
        };
    }

    return {
        valid: true
    };

}
// ==============================================










// ==============================================
// INITIALIZATION

function refreshData() {

    songSummary = buildSongSummary();

    countrySummary = buildCountrySummary();

    populateCountryDropdown();

    renderSongs(songSummary);

    renderCountries(countrySummary);

}

refreshData();
// ==============================================