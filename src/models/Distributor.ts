export interface DistributorJSON {
  user_id: number;
  distributor_id: string;
  user_name: string;
  user_mobile: string;
  user_password: string;
  user_company_name: string;
  city_state: string;
}

export class Distributor {
  constructor(
    public user_id: number,
    public distributor_id: string,
    public user_name: string,
    public user_mobile: string,
    public user_password: string,
    public user_company_name: string,
    public city_state: string
  ) {}

  static fromJSON(json: DistributorJSON): Distributor {
    return new Distributor(
      json.user_id,
      json.distributor_id,
      json.user_name,
      json.user_mobile,
      json.user_password,
      json.user_company_name,
      json.city_state
    );
  }

  toJSON(): DistributorJSON {
    return {
      user_id: this.user_id,
      distributor_id: this.distributor_id,
      user_name: this.user_name,
      user_mobile: this.user_mobile,
      user_password: this.user_password,
      user_company_name: this.user_company_name,
      city_state: this.city_state,
    };
  }
}
