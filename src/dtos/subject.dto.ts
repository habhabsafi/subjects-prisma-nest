
export class Subject {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    subtitle: string
    content: string | null
    isVisible: boolean
    type: number
    authorId: number | null
    public parsedCreatedAtDate(): string {
        return this.createdAt.toLocaleDateString();
    }
}
export class AddSubjectModel {
    title: string
    subtitle: string | null
    content: string | null
    isVisible: boolean
    type: number
}
export class EditSubjectModel extends AddSubjectModel {
    id: number;
}
export enum SubjectSortProps {
    Title, Subtitle
}
export interface FilteredSubjects {
    subjects: Subject[]
    totalCount: number
}
export class SubjectFilter {

    page: number;
    countPerPage: number;
    keyword: string;
    filterVisible: boolean;
    type?: number;
    subjectSortBy?: number;
    sortDesc: boolean;

}