export class UserRecord {
  public user_id: string;
  public name: string;
  public description: string;
  public github_id: string;
  public qiita_id: string;
  public x_id: string;
  public created_at: string;

  constructor(
    user_id: string,
    name: string,
    description: string,
    github_id: string,
    qiita_id: string,
    x_id: string,
    created_at: string,
  ) {
    this.user_id = user_id;
    this.name = name;
    this.description = description;
    this.github_id = github_id;
    this.qiita_id = qiita_id;
    this.x_id = x_id;
    this.created_at = created_at;
  }

  public static newUserRecord(
    user_id: string,
    name: string,
    description: string,
    github_id: string,
    qiita_id: string,
    x_id: string,
    created_at: string,
  ): UserRecord {
    return new UserRecord(
      user_id,
      name,
      description,
      github_id,
      qiita_id,
      x_id,
      formatDate(created_at),
    );
  }
}

export class UserSkillRecord {
  public id: number;
  public user_id: string;
  public skill_id: number;
  public created_at: string;

  constructor(
    id: number,
    user_id: string,
    skill_id: number,
    created_at: string,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.skill_id = skill_id;
    this.created_at = created_at;
  }

  public static newUserSkillRecord(
    id: number,
    user_id: string,
    skill_id: number,
    created_at: string,
  ): UserSkillRecord {
    return new UserSkillRecord(id, user_id, skill_id, formatDate(created_at));
  }
}

export class SkillRecord {
  public id: number;
  public name: string;
  public created_at: string;

  constructor(id: number, name: string, created_at: string) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
  }

  public static newSkillRecord(
    id: number,
    name: string,
    created_at: string,
  ): SkillRecord {
    return new SkillRecord(id, name, formatDate(created_at));
  }
}

export class MeishiRecord {
  public user_id: string;
  public user_name: string;
  public description: string;
  public skills: string[];
  public github_id: string;
  public github_url: string;
  public qiita_id: string;
  public qiita_url: string;
  public x_id: string;
  public x_url: string;

  constructor(
    user_id: string,
    user_name: string,
    description: string,
    skills: string[],
    github_id: string,
    github_url: string,
    qiita_id: string,
    qiita_url: string,
    x_id: string,
    x_url: string,
  ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.description = description;
    this.skills = skills;
    this.github_id = github_id;
    this.github_url = github_url;
    this.qiita_id = qiita_id;
    this.qiita_url = qiita_url;
    this.x_id = x_id;
    this.x_url = x_url;
  }

  public static createMeishi(
    user_id: string,
    user_name: string,
    description: string,
    skills: string[],
    github_id: string,
    qiita_id: string,
    x_id: string,
  ): MeishiRecord {
    return new MeishiRecord(
      user_id,
      user_name,
      description,
      skills,
      github_id,
      `https://github.com/${github_id}`,
      qiita_id,
      `https://qiita.com/${qiita_id}`,
      x_id,
      `https://x.com/${x_id}`,
    );
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // getMonth() は0から始まるため、1を足す
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}
