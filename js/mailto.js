$form = document.querySelector('form')
$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const cc = document.querySelector('#email').value
  const subject = 'New Project'
  const body = document.querySelector('#message').value

  const uri = `mailto:max@hashed.io?cc=${cc}&subject=${subject}&body=${body}`;
  console.log(uri)
  window.open(uri);
})