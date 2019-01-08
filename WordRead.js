import React,{Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import superagent from 'superagent';
import mammoth from 'mammoth';
var html = 'a';
var arrayBuffer = '';
export default class ReadWordFile extends TrackerReact(Component){
  constructor() { 
   super();
   // this.handleFileSelect = this.handleFileSelect.bind();
    this.state = {
      content : '',

      subscription :{
      }
    }
  }
  handleFileSelect(event) {
    var options = {
        styleMap: [
            "superscript => sup",
            "subscript => sub",
        ],
        convertImage: mammoth.images.imgElement(function(image) {
          return image.read("base64").then(function(imageBuffer) {
              return {
                  src: "data:" + image.contentType + ";base64," + imageBuffer
              };
          });
        })
    };
    this.readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
        mammoth.convertToHtml({arrayBuffer: arrayBuffer},options)
            .then(function(result){
          var html = result.value; // The generated HTML
          var messages = result.messages; // Any messages, such as warnings during conversion
            //Written for updating to database
            console.log('html ',html);
            console.log('messages ',messages);
      })
      .done();
    });
  }
  readFileInputEventAsArrayBuffer(event, callback) {
      var file = event.currentTarget.files[0];

      var reader = new FileReader();
      
      reader.onload = function(loadEvent) {
          arrayBuffer = loadEvent.target.result;
          callback(arrayBuffer);
      };
      
      reader.readAsArrayBuffer(file);
  }
  displayResult(){
    return(<div id="showContent">{html}</div>);
  }
  render() {
    if(!this.props.loading){      
       return (
        <section className="content-wrapper">
        <div className="content">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="box box-primary">
              <div className="box-header with-border">
               <h2 className="box-title">Read Word File</h2>
              </div>
              <div className="box-body ">
                <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                  <form id="fileUpload" >
                    <div className="signupBody col-lg-12 col-md-8 col-sm-12 col-xs-12">
                     <div className="form-group col-lg-6 col-md-4 col-xs-6 col-sm-6 inputContent">
                        <span className="blocking-span">
                          <input type="file" className="btn inputFiles col-lg-6" onChange={this.handleFileSelect.bind(this)} /> 
                      </span>
                      </div>
                    </div> 
                  </form>
                </div>  
          </div>
        </div>
       </div>
     </div>
     </section>
      );
    }else{
      return <span>loading</span>
    }
  }
}
