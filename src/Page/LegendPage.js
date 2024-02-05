import React from "react";

export default function LegendPage() {
  return (
    <div className='container my-3'>
  <table class="table table-striped">
  <thead>
    <tr id="tableHeader">
      <th scope="col">Pricing Legend</th>
    </tr>
    <tr>
      <th scope="col">Short Form</th>
      <th scope="col">What it is</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Parking Lane Closed</td>
      <td>$270.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Cycle Track</td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">SWC</th>
      <td>Side Walk Closed, W/O Lane Closure. If SWC Is Part Of Lane Closure Than DO NOT Charge</td>
      <td>$270.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Single Lane Closed</td>
      <td>$270.00</td>
    </tr>
    <tr>
      <th scope="row">LL</th>
      <td>Left Lane Closed</td>
      <td>$270.00</td>
    </tr>
    <tr>
      <th scope="row">LCL</th>
      <td>Left Centre Lane Closed</td>
      <td>$270.00</td>
    </tr>
    <tr>
      <th scope="row">2 LL</th>
      <td>2 Lanes</td>
      <td>$405.00</td>
    </tr>
    <tr>
      <th scope="row">3 LL</th>
      <td>3 Lanes</td>
      <td>$535.00</td>
    </tr>
    <tr>
      <th scope="row">4 LL</th>
      <td>4 Lanes</td>
      <td>$750.00</td>
    </tr>
    <tr>
      <th scope="row">RL</th>
      <td>Right Lanes Closed</td>
      <td>$270.00</td>
    </tr>
    <tr>
      <th scope="row">2 RL</th>
      <td>2 Lanes</td>
      <td>$405.00</td>
    </tr>
    <tr>
      <th scope="row">3 RL</th>
      <td>3 Lanes</td>
      <td>$535.00</td>
    </tr>
    <tr>
      <th scope="row">4 RL</th>
      <td>4 Lanes</td>
      <td>$750.00</td>
    </tr>
    <tr>
      <th scope="row">RC</th>
      <td>Alley Closed</td>
      <td>$405.00</td>
    </tr>
    <tr>
      <th scope="row">RC</th>
      <td>Road Closed</td>
      <td>$535.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>1 Lane, Reduced Speeds</td>
      <td>$405.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>2 Lanes, Reduced Speeds</td>
      <td>$535.00</td>
    </tr>
    <tr>
      <th scope="row">TWT</th>
      <td>Two-Way Traffic</td>
      <td>$535.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Plan</td>
      <td>$100.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Restamped Plan</td>
      <td>$150.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Stamped Plan</td>
      <td>$300.00</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>Rush Engineer Stamped Plan</td>
      <td>$400.00</td>
    </tr>
    <tr>
      <th scope="row">Arrowboard</th>
      <td>Arrowboard</td>
      <td>$100/day</td>
    </tr>
    <tr>
      <th scope="row">Message Board</th>
      <td>Message Board</td>
      <td>$150/day</td>
    </tr>
    <tr>
      <th scope="row">Standby/Roaming</th>
      <td>Standby/Roaming</td>
      <td>$95.00/hour</td>
    </tr>
  </tbody>
</table>
    </div>
  );
}