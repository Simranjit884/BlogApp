import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {createpost} from '../actions';
import {connect} from 'react-redux';

class PostsNew extends Component{
    renderField(field){
        const className=`form-group ${field.meta.touched&&field.meta.error?'has-danger':''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                className="form-control"
                type="text"
                {...field.input} /*this means all the field.input object's event handlers will be passed as props to the <input>.//ex- onChange={field.input.onChange}, onClick={field.input.onClick}*//>
                <div className="text-help">
                {field.meta.touched?field.meta.error:''}
                </div>
            </div>                                                  
        );
    }
    onSubmit(values){
        this.props.createpost(values,()=>{this.props.history.push("/")});
    }
    render(){
        const {handleSubmit}=this.props;    //this.props.handleSubmit
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        );
    }
}
function validate(values){
    const errors={};
    if(!values.title){
        errors.title="Please enter the title";
    }
    if(!values.categories){
        errors.categories="Please enter the categories";
    }
    if(!values.content){
        errors.content="Please enter the description";
    }
    return errors;
}
export default reduxForm({
    validate,
    form:'firstform'            //This should be unique for each form inside an application.
})(
    connect(null,{createpost})(PostsNew)
    );