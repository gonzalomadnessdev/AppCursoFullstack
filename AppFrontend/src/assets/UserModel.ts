export class UserModel{
    _id: string;
    id : number;
    firstName:  string;
    lastName: string;
    password:  string;
    phone: number;
    email: string;
    isActive: boolean;

    constructor(_id:string = "" , id:number = null , firstName:string = "" , lastName:string = "" , password:string = "" , phone:number = null , email:string = "" , isActive:boolean =  false  ){
        this._id= _id;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.isActive = isActive
    }
  }