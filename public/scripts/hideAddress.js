const isForDelivery = document.getElementById('isForDelivery');
const address = document.getElementById('address');

isForDelivery.addEventListener('change', () => {
  if (isForDelivery.checked) {
    address.classList.remove('hidden');
  } else {
    address.classList.add('hidden');
  }
});

if (!isForDelivery.checked) address.classList.add('hidden');