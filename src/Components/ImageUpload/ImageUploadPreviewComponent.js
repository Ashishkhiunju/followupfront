
import React, { Component } from 'react';

class ImageUploadPreviewComponent extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null]
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
    }

    uploadMultipleFiles(e) {
        // console.log(this.fileArray);
        this.fileObj.push(e.target.files)

        for (let i = 0; i < this.fileObj[0].length; i++) {
            // this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))//for multiple
            this.fileArray.push(URL.createObjectURL(e.target.files[0]))//for single
        }
        this.setState({ file: this.fileArray })

    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    deleteImage(e){
        e.preventDefault()
        this.fileArray.splice(e.target.value, 1);

        this.setState({ file: this.fileArray })
    }

    render() {
        return (
            <form>
                <div className="form-group multi-preview">
                <div class="row">
                    {(this.fileArray || []).map((url,index)=> (
                        <div class="col-md-2">
                            <img src={url} alt="..." height="100" width="100"/>&nbsp;<button className="fa fa-trash alert alert-danger" title="Remove" onClick={this.deleteImage} value={index}></button>
                        </div>

                    ))}
                    </div>
                </div>

                <div className="form-group col-md-4">
                    <label>Choose Files</label>
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} />
                </div>
            </form>
        )
    }
}


export default ImageUploadPreviewComponent;
