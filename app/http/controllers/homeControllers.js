function homeControllers(){
    return{
        //homepage get
        home(req,res){
            res.render('home',{layout: 'layout/layout', title: 'Home'})
        },

        
        //
    }
}

module.exports = homeControllers