class Search extends React.Component{
constructor(props){
    super(props);
    this.state ={
        moviename: null,
        result: [],
        errors: false
    }

    this.changehandler = this.changehandler.bind(this);
    this.submissionhandler = this.submissionhandler.bind(this);
    this.callApi = this.callApi.bind(this);
    this.displayError = this.displayError.bind(this);
}

changehandler(event){
    this.setState({moviename: event.target.value});
}

submissionhandler(){
    this.callApi();
}

displayError(){
    if(this.state.errors === true){
        return(
            <div className="newerror">
            <div className="alert alert-danger" role="alert">
            No movie with that name found! Please try again.
            </div>
            </div>
        )
    }
}


callApi(){
    const BASEURL = "https://api.themoviedb.org/3/search/movie?";
    const APIKEY = " "; //generate APi key from themoviedb.org
    let self = this;
    axios.get(`${BASEURL}api_key=${APIKEY}&query=${this.state.moviename}`)
    .then(function (response) {
      self.setState({result: response.data.results}, {error: false});
      if(response.data.results.length === 0){
        self.setState({errors: true});
      }
    })
 }


render(){   
    let resultlist = this.state.result.map(function(res, index)
    {   
        return (
            <div className="resultfetch" key = {index}>
               <div className="details">
               <table>
                <tr>
                <td>
                <div className="movietitle"><strong>{index+1}. {res.title}</strong></div>
               <div className="releasedate"><strong>Release Date: </strong>{res.release_date}</div>
               <div className="overview"><em>{res.overview}</em></div></td>
               <td><div className="posterpath"><img src={ 'https://image.tmdb.org/t/p/w640'+ res.poster_path}/></div></td></tr>
               </table>
           </div>
           </div>
        )
    });
    return(
    <div className="Search">
    <input type="text" placeholder="Type the name of a movie here" className="form-control" onChange = {this.changehandler}/><br/>
    <input type="submit" className="btn btn-primary" value="Search" onClick={this.submissionhandler}/>
    {resultlist}
    {this.displayError()}
    
     </div>
    )
}
}
ReactDOM.render(
    <Search/>, document.getElementById('app')
);