// Select test between several

import React, { Component } from 'react'

class Menu extends Component {
  render() {
    return (
      <div>
      <h1 className="text-center">Testai klausai lavinti</h1>


        <form>
        <div class="form-group">
            <label for="exampleFormControlSelect1">Pasirinkite dainą, su kuria žaisite:</label>
            <select className="form-control" id="exampleFormControlSelect1">
            <option>Song 1</option>
            <option>Song 2</option>
            <option>Song 3</option>
            <option>Song 4</option>
            <option>Song 5</option>
            </select>
            <div className="form-check">
            <label>Pasirinkit testo rūšį: </label>
        
        <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
            <label class="form-check-label" for="exampleRadios1">
                Fiksuoti dažniai
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
            <label class="form-check-label" for="exampleRadios2"> Nefiksuoti dažniai</label>
            </div>
            </div>
            <div className="form-check">
                
            </div>
        <button type="submit" class="btn btn-primary">Žaisti</button>
        </div>
        </form>
        </div>
    
    )
  }
}

export default Menu;