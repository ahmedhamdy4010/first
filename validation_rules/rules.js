module.exports = {
    users: {
        create: {
            name: {
                required: true,
                message: 'Name cannot be empty'
            },
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            phone: {
                required: true,
                len: 11,
                message: 'Invalid Phone'
            },
            password: {
                required: true,
                min: 4,
                message: 'Invalid Password'
            },

            sub_id: {
                required: true,
                message: 'Must select a sub_id'
            }
        },
        update: {
            name: {
                required: true,
                message: 'Name cannot be empty'
            },
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            phone: {
                required: true,
                len: 11,
                message: 'Invalid Phone'
            },
            sub_id: {
                required: true,
                message: 'Invalid sub_id'
            }
        },
        login: {
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            password: {
                required: true,
                message: 'Password cannot be empty'
            }
        },
        changePassword: {
            oldPassword: {
                required: true,
                min: 4,
                message: 'Invalid old password'
            },
            newPassword: {
                required: true,
                min: 4,
                message: 'Invalid new password'
            },
            confirmPassword: {
                required: true,
                min: 4,
                message: 'Invalid confirm password'
            }
        }
    },

    device: {
        create: {
            sub_id: {
                required: true,
                message: 'sub_id cannot be empty'
            },

            creator_id: {
                required: true,
                message: 'creator_id cannot be empty'
            },
            Type: {
                required: true,
                message: 'لا يمكن ترك النوع فارغ'
            },
            description: {
                required: true,
                message: 'لا يمكن ترك الوصف فارغ'
            },
            model: {
                required: true,
                message: 'لا يمكن ترك الموديل فارغ'
            },
            sn: {
                required: false,
                message: 'لا يمكن ترك السيريل فارغ'
            },

            ip: {
                required: true,
                message: 'لا يمكن ترك الرقم التعريفي الخاص بالشبكه فارغ '
            }
        },

        complaint_request: {

            sub_id: {
                required: true,
                message: 'sub_id cannot be empty'
            },

            creator_id: {
                required: true,
                message: 'creator_id cannot be empty'
            },
            numbertekit: {
                required: true,
                message: 'numbertekit cannot be empty'
            },
            description: {
                required: true,
                message: 'description cannot be empty'
            },

            barcode: {
                required: true,
                message: 'barcode cannot be empty'
            }

        }
    }
,
input: {
    insave: {
        text: {
            required: true,
            message: 'this cannot be empty',
//                  is: ["^[a-z]+$",'i'],     // same as above, but constructing the RegExp from a string
 //       pattern:"/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/",
      pattern:"[\u0600-\u06FF\u0750-\u077F]",
      isAlpha: true          // will only allow letters
        }
    }
},
search: {
    input: {
        text: {
       required: true,
       message: 'لا يمكن ادخال تلك القيمه',
       type: 'string',
       isAlpha: true          // will only allow letters

        }
    }
}
};
 //       pattern:"/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/",
// pattern:"[^)\]\[\}\{:$#!~_;.,*('\x22]+"
 //pattern:  "/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]"