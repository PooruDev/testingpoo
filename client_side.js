// Sidebar functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(
    '.theme-toggle img[src*="menu-icon"]'
  );
  const sidebarNav = document.getElementById("sidebar-nav");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const settingsSidebar = document.getElementById("settings-sidebar");
  const addContactModal = document.getElementById("add-contact-modal");
  const closeAddContact = document.getElementById("close-add-contact");
  const body = document.body;

  // Toggle sidebar when menu icon is clicked
  menuIcon.addEventListener("click", function () {
    sidebarNav.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
    // Prevent body scrolling when sidebar is open
    body.style.overflow = sidebarNav.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close sidebar when clicking outside
  sidebarOverlay.addEventListener("click", function () {
    sidebarNav.classList.remove("active");
    settingsSidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    body.style.overflow = "";
  });

  // Handle settings link click
  const settingsLink = sidebarNav.querySelector('a[href="#settings"]');
  settingsLink.addEventListener("click", function (e) {
    e.preventDefault();
    sidebarNav.classList.remove("active");
    settingsSidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    body.style.overflow = "hidden";
  });

  // Handle Add Contact link click
  const addContactLink = settingsSidebar.querySelector(
    'a[href="#add-contact"]'
  );
  addContactLink.addEventListener("click", function (e) {
    e.preventDefault();
    addContactModal.style.display = "flex";
    body.style.overflow = "hidden";
  });

  // Close Add Contact modal
  closeAddContact.addEventListener("click", function () {
    addContactModal.style.display = "none";
    body.style.overflow = "";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === addContactModal) {
      addContactModal.style.display = "none";
      body.style.overflow = "";
    }
  });

  // Close sidebar when clicking on other links
  const sidebarLinks = sidebarNav.querySelectorAll('a:not([href="#settings"])');
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebarNav.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      body.style.overflow = "";
    });
  });
});

// Contact List Modal Functionality
const contactListModal = document.getElementById("contact-list-modal");
const closeContactList = document.getElementById("close-contact-list");
const contactList = document.getElementById("contact-list");

// Show contact list modal when clicking the Contact List link
document
  .querySelectorAll(".settings-sidebar .sidebar-nav-container a")
  .forEach((link) => {
    if (link.textContent.trim() === "Contact List") {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        contactListModal.style.display = "flex";
        document.body.style.overflow = "hidden";
        loadContacts(); // Function to load contacts from the server
      });
    }
  });

// Close contact list modal
closeContactList.addEventListener("click", function () {
  contactListModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
contactListModal.addEventListener("click", function (e) {
  if (e.target === contactListModal) {
    contactListModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Function to load contacts
function loadContacts() {
  // Clear existing contacts
  contactList.innerHTML = "";

  // Fetch contacts from server
  fetch("../assets/php/get_contacts.php")
    .then((response) => response.json())
    .then((contacts) => {
      contacts.forEach((contact) => {
        const contactItem = document.createElement("div");
        contactItem.className = "contact-item";
        contactItem.innerHTML = `
          <span class="contact-name">${contact.name}</span>
          <span class="contact-number">${contact.phone}</span>
          <div class="contact-actions">
            <button class="edit-contact" data-id="${contact.id}">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="delete-contact" data-id="${contact.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        `;
        contactList.appendChild(contactItem);
      });

      // Add event listeners for edit and delete buttons
      addContactActionListeners();
    })
    .catch((error) => {
      console.error("Error loading contacts:", error);
      contactList.innerHTML =
        '<div class="error-message">Failed to load contacts</div>';
    });
}

// Function to add event listeners for contact actions
function addContactActionListeners() {
  // Edit contact
  document.querySelectorAll(".edit-contact").forEach((button) => {
    button.addEventListener("click", function () {
      const contactId = this.dataset.id;
      // Implement edit functionality
      console.log("Edit contact:", contactId);
    });
  });

  // Delete contact
  document.querySelectorAll(".delete-contact").forEach((button) => {
    button.addEventListener("click", function () {
      const contactId = this.dataset.id;
      if (confirm("Are you sure you want to delete this contact?")) {
        // Implement delete functionality
        console.log("Delete contact:", contactId);
      }
    });
  });
}

// Message Config Modal Functionality
const messageConfigModal = document.getElementById("message-config-modal");
const closeMessageConfig = document.getElementById("close-message-config");
const messageForm = document.getElementById("message-form");

// Show message config modal when clicking the Message Config link
document
  .querySelectorAll(".settings-sidebar .sidebar-nav-container a")
  .forEach((link) => {
    if (link.textContent.trim() === "Message Config") {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        messageConfigModal.style.display = "flex";
        document.body.style.overflow = "hidden";
        loadMessage(); // Function to load existing message
      });
    }
  });

// Close message config modal
closeMessageConfig.addEventListener("click", function () {
  messageConfigModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
messageConfigModal.addEventListener("click", function (e) {
  if (e.target === messageConfigModal) {
    messageConfigModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Message Selector Functionality
const messageBtn = document.getElementById("message-dropdown-btn");
const messageDropdown = document.getElementById("message-dropdown");
const contactsList = document.getElementById("contacts-list");
const selectedMessage = document.getElementById("selected-message");

// Toggle dropdown
messageBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  messageDropdown.classList.toggle("active");
  messageBtn.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (!messageDropdown.contains(e.target) && !messageBtn.contains(e.target)) {
    messageDropdown.classList.remove("active");
    messageBtn.classList.remove("active");
  }
});

// Function to load contacts into dropdown
function loadContactsForMessage() {
  fetch("../../Assets/php/get_contacts.php")
    .then((response) => response.json())
    .then((contacts) => {
      contactsList.innerHTML = ""; // Clear existing contacts

      contacts.forEach((contact) => {
        const contactItem = document.createElement("div");
        contactItem.className = "dropdown-item";
        contactItem.dataset.value = `contact_${contact.id}`;
        contactItem.textContent = contact.name;
        contactsList.appendChild(contactItem);
      });

      // Add click handlers for all dropdown items
      addDropdownItemHandlers();
    })
    .catch((error) => {
      console.error("Error loading contacts:", error);
    });
}

// Function to add click handlers for dropdown items
function addDropdownItemHandlers() {
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function () {
      const value = this.dataset.value;
      const text = this.textContent;

      // Update selected option and value
      const selectedOption = messageBtn.querySelector(".selected-option");
      selectedOption.textContent = text;
      selectedMessage.value = value;

      // Close dropdown
      messageDropdown.classList.remove("active");
      messageBtn.classList.remove("active");
    });
  });
}

// Function to load existing message and contacts
function loadMessage() {
  // Load contacts into dropdown
  loadContactsForMessage();

  // Load existing message
  fetch("../../Assets/php/get_message.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        document.getElementById("message-content").value = data.message;
      }
      if (data.recipient) {
        selectedMessage.value = data.recipient;
        // Update selected option if needed
        const selectedItem = document.querySelector(
          `.dropdown-item[data-value="${data.recipient}"]`
        );
        if (selectedItem) {
          const selectedOption = messageBtn.querySelector(".selected-option");
          selectedOption.textContent = selectedItem.textContent;
        }
      }
    })
    .catch((error) => {
      console.error("Error loading message:", error);
    });
}

// Handle message form submission
messageForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const messageContent = document.getElementById("message-content").value;
  const recipient = selectedMessage.value;

  if (!recipient) {
    alert("Please select a recipient");
    return;
  }

  fetch("../assets/php/save_message.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: messageContent,
      recipient: recipient,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        messageConfigModal.style.display = "none";
        document.body.style.overflow = "auto";
        alert("Message saved successfully!");
      } else {
        throw new Error(data.error || "Failed to save message");
      }
    })
    .catch((error) => {
      console.error("Error saving message:", error);
      alert("Failed to save message. Please try again.");
    });
});
