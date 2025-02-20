import React, { Component } from 'react';
import { Rate, Icon, Button, Tooltip } from 'antd';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import './PthreeColumn.css'

class ProductInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isData: true,
      data: {},
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    let data = this.props.data;
    if (data === undefined) {
      this.setState({
        isData: false
      })
    } else {
      this.setState({
        isData: true,
        data: data
      })
    }
  }
  render() {
    const { data } = this.state;
    let length = data.itemLength;
    let weight = data.itemWeight;
    let width = data.itemWidth;
    return (
      <div>
        <table class="table table-bordered">
          <tbody>
            {data.lenseColor ?
              <tr>
                <td><strong>Lense Color</strong></td>
                <td>{data.lenseColor}</td>
              </tr>
              : null}

            {data.countryLabeled ?
              <tr>
                <td><strong>Country Labeled</strong></td>
                <td>{data.countryLabeled}</td>
              </tr>
              : null}
            {data.gtin ?
              <tr>
                <td><strong>GTIN</strong></td>
                <td>{data.gtin}</td>
              </tr>
              : null}
            {data.handlingTime ?
              <tr>
                <td><strong>Handling Time</strong></td>
                <td>{data.handlingTime}</td>
              </tr>
              : null}
            {data.importDesignation ?
              <tr>
                <td><strong>Import Designation</strong></td>
                <td>{data.importDesignation}</td>
              </tr>
              : null}
            {length ?
              <tr>
                <td><strong>Item Length</strong></td>
                <td>{length.itemLengthNumber} {length.itemLengthUnit}</td>
              </tr>
              : null}

            {data.maximumWeight ?
              <tr>
                <td><strong>Maximum Weight</strong></td>
                <td>{data.maximumWeight}</td>
              </tr>
              : null}
            {data.orientation ?
              <tr>
                <td><strong>Orientation</strong></td>
                <td>{data.orientation}</td>
              </tr>
              : null}
            {data.quantity ?
              <tr>
                <td><strong>Quantity</strong></td>
                <td>{data.quantity}</td>
              </tr>
              : null}
            {data.pakageQuantity ?
              <tr>
                <td><strong>Pakage Quantity</strong></td>
                <td>{data.pakageQuantity}</td>
              </tr>
              : null}

            {data.seller ?
              <tr>
                <td><strong>Seller</strong></td>
                <td>{data.seller}</td>
              </tr>
              : null}
            {data.shaft ?
              <tr>
                <td><strong>Shaft</strong></td>
                <td>{data.shaft}</td>
              </tr>
              : null}
            {data.shape ?
              <tr>
                <td><strong>Shape</strong></td>
                <td>{data.shape}</td>
              </tr>
              : null}
            {data.size ?
              <tr>
                <td><strong>Size</strong></td>
                <td>{data.size}</td>
              </tr>
              : null}
            {data.taxCode ?
              <tr>
                <td><strong>Tax Code</strong></td>
                <td>{data.taxCode}</td>
              </tr>
              : null}
            {data.tension ?
              <tr>
                <td><strong>Tension</strong></td>
                <td>{data.tension}</td>
              </tr>
              : null}
            {data.variationTheme ?
              <tr>
                <td><strong>Variation Theme</strong></td>
                <td>{data.variationTheme}</td>
              </tr>
              : null}

            {data.sellingDate ?
              <tr>
                <td><strong>Date First Available</strong></td>
                <td>{data.sellingDate}</td>
              </tr>
              : null}
            {data.salePriceDate1 ?
              <tr>
                <td><strong>Sale Date Start</strong></td>
                <td>{data.salePriceDate1}</td>
              </tr>
              : null}
            {data.salePriceDate2 ?
              <tr>
                <td><strong>Sale Date End</strong></td>
                <td>{data.salePriceDate2}</td>
              </tr>
              : null}
            {data.restockDate ?
              <tr>
                <td><strong>Restock Date</strong></td>
                <td>{data.restockDate}</td>
              </tr>
              : null}
            {data.offering ?
              <tr>
                <td><strong>Offering Date</strong></td>
                <td>{data.offering}</td>
              </tr>
              : null}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ProductInformation;
