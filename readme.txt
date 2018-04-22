http://localhost:3000/staff/profile/5ad87e9dfbe0dd0790d78807    - UNAPPROVED
http://localhost:3000/staff/profile/5ad88022e5b3754d54ab52c6    - APPROVED
http://localhost:3000/staff/profile/5ad8807e2cac1f2ae0a60782	- ADMIN





router.post('/profile/:id', ensureAuthenticated, (req,res) => {
    Staff.findOne({
        _id : req.params.id
    })
    .then(staff => {
        if(staff.id != req.params.id || staff.staffPriviledge != 'Admim') {
            res.redirect('/dashboard');
        } else {
            res.render('staff/edit-profile', {
                staff : staff
            });
        }
    });
});