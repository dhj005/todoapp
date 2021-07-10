import React from 'react';
import storage from './storage';
import './App.css'

class Todo extends React.Component{
    state={
        arr: storage.parse() ? storage.parse() : [],
        value: "",
        editable: -1,
        editValue: ""

    }

    handleChange=(e)=>{
        this.setState({value:e.target.value})
    }

    handleForm=(e)=>{
        e.preventDefault();
        let arr1 = this.state.arr;
        let value1 = this.state.value;
        arr1.push(value1)
        this.setState({ arr: arr1, value:""},()=>storage.save(this.state.arr));


    }

    handleDelete=(i)=>{
        let arr1 = this.state.arr;
        arr1.splice(i,1);
        this.setState({arr: arr1},()=>storage.save(this.state.arr))
        console.log(arr1);
    }

    handleEdit=(d,i)=>{
        const {arr,editable,editValue}  = this.state;
        if(editable===i){
            let arr1 = this.state.arr;
            console.log(editValue,arr1[i])
            arr1[i] = !!editValue? editValue : arr1[i];
            this.setState({arr: arr1,editable:-1,editValue:""},()=>storage.save(this.state.arr));
        }else{
            this.setState({editable: i});
        }

    }

    handleEditChange=(e)=>{
        this.setState({editValue: e.target.value});
    }



    render(){
        const {value,arr,editable} = this.state;
        return(
            <div style={{padding:'20px'}}>
                <form onSubmit={(e)=>this.handleForm(e)}>
                    <input type="text" value={value}
                    onChange={(e)=>this.handleChange(e)} required/>
                    <input type="submit" value="ADD"/>
                </form>
                <div style={{width:'400px',margin:'0px auto'}}>
                {arr.map((d,i)=>
                    <div key={"item-"+i} className="listWrapper">
                        <input 
                        style={{margin:"0px 10px"}} 
                        disabled={editable === i ? false : true} 
                        onBlur={(e)=>this.handleEditChange(e)}
                        style={{border:editable === i ? "3px solid green" : "1px solid grey"  }}
                        defaultValue={d}/>
                            {/* {d}</code> */}
                        <button onClick={()=>this.handleEdit(d,i)}>
                            {editable === i ? "save" : "edit" }
                        </button>
                        <button onClick={()=>this.handleDelete(i)}>🗑 </button>
                    </div>
                    )}
                    </div>
            </div>
        )
    }
}

export default Todo;