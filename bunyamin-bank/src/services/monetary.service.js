import {
    addNewItemWithValue,
    getLocalStorageItem,
    updateLocalStorageItem
} from './base.service';

function getUserBalance(userName)
{
    try
    {
        var user = getLocalStorageItem(userName);
        var userAccounts = user["accounts"];

        return userAccounts.reduce((prevAcc, currAcc, index) => prevAcc.balance + currAcc.balance);
    }
    catch(err)
    {
        if(err.code === "inexistentValue")
        {
            return {
                ErrorList: ["Girilen kullanıcı adına uygun kullanıcı bulunamadı."],
                Status: false
            }
        }
        else
        {
            return {
                ErrorList: [err.message],
                Status: false
            }
        }
    }
}

function setUserBalance(userName, accountCode, newBalance)
{
    try
    {
        var users = getLocalStorageItem('users');
        console.log("setUserBalance -> info", accountCode, userName, newBalance);
        if(users !== undefined)
        {
            var user = users.find(u => u.userName === userName);
            var usersExceptUser = users.filter(u => u.userName !== userName);

            console.log("setUserBalance -> user", user);

            user.accounts.find(a => a.accountCode === accountCode).balance = newBalance;
            usersExceptUser.push(user);
            updateLocalStorageItem('users', usersExceptUser);

            return {
                Status: true
            }
        }
        else
        {
            return {
                ErrorList: ["Girilen kullanıcı adına uygun kullanıcı bulunamadı."],
                Status: false
            }
        }
    }
    catch(err)
    {
        console.log("setUserBalance => exception", err);

        if(err.code === "inexistentValue")
        {
            return {
                ErrorList: ["Girilen kullanıcı adına uygun kullanıcı bulunamadı."],
                Status: false
            }
        }
        else
        {
            return {
                ErrorList: [err.message],
                Status: false
            }
        }
    }
}

function addTransfer(
    sourceUserName,
    sourceAccountCode,
    sourceBeforeBalance,
    sourceAfterBalance,
    destinationUserName,
    destinationAccountCode,
    destinationBeforeBalance,
    destinationAfterBalance,
    _amount
)
{
    try 
    {
        var users = getLocalStorageItem("users");

        var sourceUser = users.find(u => u.userName === sourceUserName);
        var destinationUser = users.find(u => u.userName === destinationUserName);

        if(sourceUser && destinationUser)
        {
            var transfers = getLocalStorageItem("transfers");
            var newTransfer = {
                source: {
                    accountCode: sourceAccountCode,
                    userName: sourceUserName,
                    beforeBalance: sourceBeforeBalance,
                    afterBalance: sourceAfterBalance
                },
                destination: {
                    accountCode: destinationAccountCode,
                    userName: destinationUserName,
                    beforeBalance: destinationBeforeBalance,
                    afterBalance: destinationAfterBalance
                },
                amount: _amount,
                date: new Date()
            }

            console.log("newTransfer", newTransfer);

            if(transfers === undefined)
            {
                addNewItemWithValue("transfers", [newTransfer]);
            }
            else
            {
                transfers.push(newTransfer);
                updateLocalStorageItem("transfers", transfers);
            }
        }
        else
        {
            return {
                ErrorList: ["Kullanıcı bulunamadı."],
                Status: false
            }
        }
    } 
    catch (error) 
    {
        return error;
    }
}

function getUserTransfers(userName)
{
    try
    {
        var transfers = getLocalStorageItem("transfers");

        if(transfers !== undefined)
        {
            var userTransfers = transfers.filter(transfer => 
            {
                return transfer.destination.userName === userName 
                    || transfer.source.userName === userName;
            });
            
            return {
                Incomings : userTransfers.filter(transfer => transfer.destination.userName === userName),
                Outgoings: userTransfers.filter(transfer => transfer.source.userName === userName),
                Status: true
            };
        }
        else
        {
            return {
                ErrorList: ['Herhangi bir transfer bulunamadı.'],
                Status: false
            }
        }
    }
    catch(err)
    {
        return {
            ErrorList: [err.message],
            Status: false
        };
    }
}

export {
    getUserBalance,
    setUserBalance,
    addTransfer,
    getUserTransfers
}