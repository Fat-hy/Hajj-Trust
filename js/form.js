document.addEventListener("DOMContentLoaded", function () {
  const langSwitcher = document.querySelector(".lang-switch");
  const langSwitcherSpan = langSwitcher.querySelector("span");
  const form = document.getElementById("whatsappForm");
  let currentURL = window.location.pathname;

  // Detect the current language based on the URL
  let currentLang = currentURL.includes("-sw") ? "sw" : "en";

  // Set the language switcher text accordingly
  if (currentLang === "sw") {
    langSwitcher.dataset.lang = "sw";
    langSwitcherSpan.textContent = "Badilisha Lugha";
  } else {
    langSwitcher.dataset.lang = "en";
    langSwitcherSpan.textContent = "Change Language";
  }

  // Function to update content based on language
  function updateLanguage() {
    document.querySelectorAll("[data-en], [data-sw]").forEach((element) => {
      if (element.dataset[currentLang]) {
        if (element.placeholder) {
          element.placeholder = element.dataset[currentLang];
        }
        if (element.textContent !== undefined) {
          element.textContent = element.dataset[currentLang];
        }
      }
    });
  }

  // Listen for language switcher click
  langSwitcher.addEventListener("click", function () {
    if (currentLang === "sw") {
      currentLang = "en";
      langSwitcher.dataset.lang = "en";
      langSwitcherSpan.textContent = "Change Language";
    } else {
      currentLang = "sw";
      langSwitcher.dataset.lang = "sw";
      langSwitcherSpan.textContent = "Badilisha Lugha";
    }
    updateLanguage();

    // Change the URL based on the language
    if (currentLang === "sw") {
      if (currentURL === "/" || currentURL === "/index") {
        window.location.href = "/index-sw";
      } else {
        window.location.href = currentURL + "-sw";
      }
    } else {
      window.location.href = currentURL.replace("-sw", "");
    }
  });

  // Initialize language content based on the detected language on page load
  updateLanguage();

  // Handle the form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Gather form values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const region = document.getElementById("region").value.trim();
    const message = document.getElementById("message").value.trim();

    // Form validation
    let hasError = false;
    document
      .querySelectorAll(".text-danger")
      .forEach((el) => (el.textContent = ""));

    if (!firstName) {
      document.getElementById("error-first-name").textContent =
        currentLang === "sw"
          ? "Jina la kwanza linahitajika."
          : "First name is required.";
      hasError = true;
    }

    if (!lastName) {
      document.getElementById("error-last-name").textContent =
        currentLang === "sw"
          ? "Jina la mwisho linahitajika."
          : "Last name is required.";
      hasError = true;
    }

    if (!region) {
      document.getElementById("error-region").textContent =
        currentLang === "sw" ? "Mkoa unahitajika." : "Region is required.";
      hasError = true;
    }

    if (!message) {
      document.getElementById("error-message").textContent =
        currentLang === "sw"
          ? "Tafadhali ingiza ujumbe wako."
          : "Please enter your message.";
      hasError = true;
    }

    if (hasError) return; // Stop the submission if there are errors

    // Format message for WhatsApp
    let fullMessage = `Assalam Alaykum, my name is ${firstName} ${lastName}. I am from ${region}.`;
    if (email) {
      fullMessage += ` My email is ${email}.`;
    }
    fullMessage += ` Message: ${message}`;

    const phoneNumber = "255745411691"; // Replace with your WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    // Redirect to WhatsApp to send the message
    alert(
      currentLang === "sw"
        ? "Utaelekezwa kwenye WhatsApp kutuma ujumbe wako."
        : "You will now be redirected to WhatsApp to send your message."
    );
    window.open(whatsappURL, "_blank");
  });
});
