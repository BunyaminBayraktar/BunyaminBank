import { 
    addNewItemWithValue, 
    updateLocalStorageItem, 
    getLocalStorageItem, 
    deleteLocalStorageItem 
} from './base.service';
import uuid from 'react-uuid';

function getUserByUserName(userName) {
    try {
        var users = getLocalStorageItem('users');

        if(users !== undefined)
        {
            return users.find(u => u.userName === userName);
        }

        return users;
    } catch (error) {
        return undefined;
    }
}

function createUser(
    userName,
    emailAddress,
    name,
    surname,
    password,
    roles,
    accounts
)
{
    try
    {
        var newUser = {
            userName: userName,
            emailAddress: emailAddress,
            name: name,
            surname: surname,
            password: password,
            roles: roles,
            accounts: accounts
        };

        var users = getLocalStorageItem("users");
        console.log("user.service.0001", users);
        if(users === undefined)
        {
            console.log("here if");
            addNewItemWithValue("users", [newUser]);
        }
        else
        {
            console.log("here else", users);
            if(users.ErrorList)
            {
                return {
                    ErrorList: users.ErrorList,
                    Status: false
                }
            }
            else
            {
                console.log("users[emailAddress]", users[emailAddress]);
                if(users.find(u => u.emailAddress === emailAddress) === undefined)
                {
                    users.push(newUser);
                    updateLocalStorageItem("users", users);
                }
                else
                {
                    return {
                        ErrorList: ['Bu mail adresiyle daha önce kayıt olunmuştur.'],
                        Status: false
                    }
                }
            }
        }
        
        return {
            Value: newUser,
            Status: true,
        }
    }
    catch(err)
    {
        console.log("user.create.err", err);
        return {
            ErrorList: ['Bu mail adresiyle daha önce kayıt olunmuştur.'],
            Status: false
        }
    }
}

function deleteUser(mailAddress) {
    try
    {
        deleteLocalStorageItem(mailAddress);
    }
    catch(err)
    {
        if(err.code !== 'inexistentValue')
        {
            throw err;
        }
    }
}

function signIn(emailAddress, password)
{
    try
    {
        var users = getLocalStorageItem("users");

        if(users !== undefined)
        {
            var user = users.find(u => u.emailAddress === emailAddress);
            
            if(user !== undefined)
            {
                if(user["password"] === password)
                {
                    return {
                        Value: user,
                        Status: true
                    };
                }
                else
                {
                    return {
                        ErrorList: [ "Mail adresi veya şifre yanlış." ],
                        Status: false
                    }
                }
            }
            else
            {
                return {
                    ErrorList: ["Girilen bilgilere uygun kullanıcı bulunamadı."],
                    Status: false
                }
            }
        }
        else
        {
            return {
                ErrorList: ["Girilen bilgilere uygun kullanıcı bulunamadı."],
                Status: false
            }
        }
    }
    catch(err)
    {
        console.log("err", err);
        if(err.code === 'inexistentValue')
        {
            return {
                ErrorList: ["Girilen bilgilere uygun kullanıcı bulunamadı."],
                Status: false
            }
        }
        else
        {
            return {
                ErrorList: [ err.message ],
                Status: false
            }
        }
    }
}

function createAccount(userName, accountName, _balance) {
    try
    {
        var users = getLocalStorageItem("users");

        console.log("users", users);

        if(users !== undefined)
        {
            var user = users.find(u => u.userName === userName);
            console.log("user.accounts", user);
            if(user !== undefined)
            {
                let usersWithoutOurUser = users.filter(u => u.userName !== userName);

                user.accounts.sort((a,b) => a.id > b.id);
                var lastAccount = user.accounts[user.accounts.length - 1];
                var account = {
                    id: lastAccount.id + 1,
                    name: accountName,
                    balance: _balance,
                    accountCode: uuid()
                };

                user.accounts.push(account);

                usersWithoutOurUser.push(user);

                updateLocalStorageItem("users", usersWithoutOurUser);

                return {
                    Value: account,
                    Status: true
                }
            }
            else
            {
                return {
                    ErrorList: [ "Kullanıcı bulunamadı." ],
                    Status: false
                }
            }
        }
        else
        {
            return {
                ErrorList: [ "Kullanıcı bulunamadı." ],
                Status: false
            }
        }
    }
    catch(err)
    {
        return {
            ErrorList: [err.message],
            Status: false
        }
    }
}

export {
    getUserByUserName,
    createUser,
    signIn,
    deleteUser,
    createAccount
}