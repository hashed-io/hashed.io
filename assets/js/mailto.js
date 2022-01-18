$form = document.querySelector('form')
$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const url = event.srcElement.action
  const cc = document.querySelector('#email').value
  const subject = 'New Project'
  const body = document.querySelector('#message').value

  const uri = `${url}?cc=${cc}&subject=${subject}&body=${body}`;
  console.log(uri)
  window.open(uri);
})