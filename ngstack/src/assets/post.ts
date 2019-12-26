export class Post {
    // backend에서 설정되는 항목
    id: Number;
    user_id: Number;
    created_at: Date;
    updated_at: Date;

    // frontend에서 설정되는 항목
    title: String;
    contents: String;
    exposed: Boolean;
    priority: Number;
}