export class UserRecord {
    constructor(user_id, name, description, github_id, qiita_id, x_id, created_at) {
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.github_id = github_id;
        this.qiita_id = qiita_id;
        this.x_id = x_id;
        this.created_at = created_at;
    }
    static newUserRecord(user_id, name, description, github_id, qiita_id, x_id, created_at) {
        return new UserRecord(user_id, name, description, github_id, qiita_id, x_id, formatDate(created_at));
    }
}
export class UserSkillRecord {
    constructor(id, user_id, skill_id, created_at) {
        this.id = id;
        this.user_id = user_id;
        this.skill_id = skill_id;
        this.created_at = created_at;
    }
    static newUserSkillRecord(id, user_id, skill_id, created_at) {
        return new UserSkillRecord(id, user_id, skill_id, formatDate(created_at));
    }
}
export class SkillRecord {
    constructor(id, name, created_at) {
        this.id = id;
        this.name = name;
        this.created_at = created_at;
    }
    static newSkillRecord(id, name, created_at) {
        return new SkillRecord(id, name, formatDate(created_at));
    }
}
export class MeishiRecord {
    constructor(user_id, user_name, description, skills, github_id, github_url, qiita_id, qiita_url, x_id, x_url) {
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
    static createMeishi(user_id, user_name, description, skills, github_id, qiita_id, x_id) {
        return new MeishiRecord(user_id, user_name, description, skills, github_id, `https://github.com/${github_id}`, qiita_id, `https://qiita.com/${qiita_id}`, x_id, `https://x.com/${x_id}`);
    }
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    // getMonth() は0から始まるため、1を足す
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
}
