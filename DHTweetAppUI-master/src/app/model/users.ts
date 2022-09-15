export class Users {
	firstName: string;
	lastName: string;
	gender: string;
	dob: string;
	userName: string;
	password: string;

	constructor(
		firstName?: string,
		lastName?: string,
		gender?: string,
		dob?: string,
		userName?: string,
		password?: string,
	) {
		this.firstName = firstName || "";
		this.lastName = lastName || "";
		this.gender = gender || "";
		this.dob = dob || "";
		this.userName = userName || "";
		this.password = password || "";
	}
}