document.addEventListener("DOMContentLoaded", function () {
  const langSwitcher = document.querySelector(".lang-switch");
  const langSwitcherSpan = langSwitcher.querySelector("span");
  const form = document.getElementById("whatsappForm");
  let currentURL = window.location.pathname;

  // Detect current language
  let currentLang = currentURL.includes("-sw") ? "sw" : "en";

  // Set language switcher text
  function setSwitcherText() {
    if (currentLang === "sw") {
      langSwitcher.dataset.lang = "sw";
      langSwitcherSpan.textContent = "Badilisha Lugha";
    } else {
      langSwitcher.dataset.lang = "en";
      langSwitcherSpan.textContent = "Change Language";
    }
  }
  setSwitcherText();

  // Update page text/placeholders based on language
  function updateLanguage() {
    document.querySelectorAll("[data-en], [data-sw]").forEach((element) => {
      const text = element.dataset[currentLang];
      if (!text) return;

      if (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.hasAttribute("placeholder")
      ) {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });
  }
  updateLanguage();

  // Handle language switcher click
  langSwitcher.addEventListener("click", function () {
    currentLang = currentLang === "sw" ? "en" : "sw";
    setSwitcherText();
    updateLanguage();

    // Change URL based on new language
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

  // Form submission handling
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const region = document.getElementById("region").value.trim();
    const message = document.getElementById("message").value.trim();

    // Clear previous errors
    document
      .querySelectorAll(".text-danger")
      .forEach((el) => (el.textContent = ""));

    let hasError = false;

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

    if (hasError) return;

    // Prepare WhatsApp message
    let fullMessage = `Assalam Alaykum, my name is ${firstName} ${lastName}. I am from ${region}.`;
    if (email) {
      fullMessage += ` My email is ${email}.`;
    }
    fullMessage += ` Message: ${message}`;

    const phoneNumber = "255754762768";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    alert(
      currentLang === "sw"
        ? "Utaelekezwa kwenye WhatsApp kutuma ujumbe wako."
        : "You will now be redirected to WhatsApp to send your message."
    );
    window.open(whatsappURL, "_blank");
  });
});
