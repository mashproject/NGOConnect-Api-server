/*

Routes for stickies

*/


exports.findAll = function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};
 
exports.detaild = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};