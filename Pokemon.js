import axios from 'axios'
import React, { Component } from 'react'

export default class Pokemon extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            loading: false,
        }
    }
    componentDidMount() {
        axios.get('https://api.pokemontcg.io/v2/cards?page=1&pageSize=10')
            .then(res => {
                this.setState({ data: res.data.data,loading: false })
            })
            .catch(e => {
                console.log("Something went Wrong", e)
            })

    }
    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
        return (
            <div className="App">
                <div className="container">
                    <div className="row content" style={{ backgroundColor: "aqua" }}>
                        {
                            this.state.data && this.state.data.length && this.state.data.length > 0 ?
                                this.state.data.map((item, index) => {
                                    return (
                                        <div className="col-lg-4 col-md-4 ">

                                            <ul className='box'>
                                                <img src={item.images.small} key={index} className='mt-5' />
                                                <h3>{item.name}</h3>
                                                <h5>Attacks:</h5>
                                                <span className='attack'>{item.attacks.map((subitem, subInex) => { return (subitem.name + ",") })}</span>
                                                <h5>Abilities:</h5>
                                                <span>{
                                                    item.abilities && item.abilities.length && item.abilities.length > 0 ?
                                                        item.abilities.map((subitem1, subInex1) => { return (subitem1.name + ",") })
                                                        : "NA"
                                                }
                                                </span>
                                            </ul>
                                        </div>)
                                })
                                : "No data found"
                        }
                    </div>
                    <div
                        ref={loadingRef => (this.loadingRef = loadingRef)}
                        style={loadingCSS}
                    >
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}

