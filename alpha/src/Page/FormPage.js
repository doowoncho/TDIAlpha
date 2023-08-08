export default function formPage(){
    return(
        <div className="container text-center">
            <h1>Create a new form</h1>
            <form>
            <div class="form-group">
                <label for="customerName">Email address</label>
                <input type="text" class="form-control" id="customerName" placeholder="Enter name"/>
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="text" class="form-control" id="email" placeholder="Enter email"/>
            </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" class="form-control" id="location" placeholder="Enter Location"/>
            </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}