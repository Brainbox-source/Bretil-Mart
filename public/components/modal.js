function modal(content, triggerElement) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'none'; // Initially hidden
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '40%';
    modal.style.borderRadius = '1em',
    modal.style.height = '90%';
    // modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // Black background with opacity

    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '80px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.borderRadius = '1em';
    modalContent.style.width = '80%';

    // Create the close button
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.color = '#aaa';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.float = 'right';
    closeBtn.style.cursor = 'pointer';
    
    // Add the close functionality to the close button
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Append content to modalContent
    modalContent.innerHTML += content;

    // Append the close button to modalContent
    modalContent.insertBefore(closeBtn, modalContent.firstChild);

    // Append modalContent to modal
    modal.appendChild(modalContent);

    // Add the modal to the body
    document.body.appendChild(modal);

    // Open the modal when triggered
    function openModal() {
        modal.style.display = 'block';

        // Add clickaway logic to close the modal
        window.onclick = function(event) {
            // Close modal if clicked outside of the modal content or trigger element
            if (!modalContent.contains(event.target) && event.target !== triggerElement) {
                modal.style.display = 'none';
            }
        };
    }

    return openModal;
}

export default modal;




