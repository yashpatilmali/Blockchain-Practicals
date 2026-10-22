const EtherTransfer = artifacts.require("EtherTransfer");

module.exports = async function (callback) {
    try {
        const contract = await EtherTransfer.deployed();
        const accounts = await web3.eth.getAccounts();

        console.log("\n========== EXPERIMENT 7 OUTPUT ==========");
        console.log("OWNER:", accounts[0]);
        console.log("RECIPIENT:", accounts[1]);
        console.log("CONTRACT:", contract.address);

        let balance = await contract.getBalance();
        console.log("INITIAL BALANCE:", balance.toString());

        await web3.eth.sendTransaction({
            from: accounts[0],
            to: contract.address,
            value: web3.utils.toWei("1", "ether")
        });

        balance = await contract.getBalance();
        console.log("AFTER DEPOSIT:", balance.toString());

        await contract.transferEther(
            accounts[1],
            web3.utils.toWei("0.5", "ether"),
            { from: accounts[0] }
        );

        balance = await contract.getBalance();
        console.log("AFTER TRANSFER:", balance.toString());

        const recipientBalance = await web3.eth.getBalance(accounts[1]);
        console.log("RECIPIENT BALANCE:", recipientBalance.toString());

        console.log("========================================\n");

        callback();
    } catch (error) {
        console.error(error);
        callback(error);
    }
};
