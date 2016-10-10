export class Member {

    //identity: string; //depreciated

    userInfo: {identity: string};

    getDisplayName() {
        return this.userInfo.identity.split(":")[2].replace("_", " ");
    }
}