function setup() {
    // Write your code here.
    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(card => 
        card.addEventListener('click', (a) => {

            document.getElementsByClassName('card')
                    .forEach((e) => {
                        e.innerHTML = "down";
                    })

            if (a.target.innerText == "down") {
                a.target.innerText = "up"
            }
        })
    )
  }
  
  // Example case. 
  document.body.innerHTML = `
  <table id="card-container">
    <tbody>
      <tr>
        <td class="card">down</td>
        <td class="card">up</td>
      </tr>
      <tr>
        <td class="card">down</td>
        <td class="card">down</td>
      </tr>
    </tbody>
  </table>`;
  
  setup();
  
//   document.getElementsByClassName("card")[0].click();
  console.log(document.body.innerHTML);