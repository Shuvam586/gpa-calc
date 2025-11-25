import { supabase } from "@/lib/supabaseClient";

type courseInfo = {
    id: string,
    name: string,
    created_at: string,
    user_id: string,
    sem: string,
    credits: string,
    grade: string,
}

type semInfo = {
    id: string,
    name: string,
    created_at: string,
    user_id: string
}

export async function addSemester({ name } : semInfo) {

    const { data, error } = await supabase
        .from('semesters')
        .insert({
            name: name
        })

    if (error) {
        console.log(error);
        return error;
    } 
    else {
        return data;
    }
}

export async function addCourse({ name, sem, credits, grade }: courseInfo) {

    const { data, error } = await supabase
        .from('courses')
        .insert({
            name: name,
            sem: sem,
            credits: credits,
            grade: grade
        })

    if (error) {
        console.log(error);
        return error;
    } 
    else {
        return data;
    }
}

export async function getSemesters() {

    const { data, error } = await supabase
        .from('semesters')
        .select('*')

    if (error) {
        console.log(error);
    } else {
        return data;
    }
}

export async function getCourses() {

    const { data, error } = await supabase
        .from('courses')
        .select('*')

    if (error) {
        console.log(error);
    } else {
        return data;
    }
}

export async function updateSemester({name, id}: semInfo) {

    console.log(name, id);

    const { data, error } = await supabase
        .from('semesters')
        .update({
            name: name
        })
        .eq("id", id)

    if (error) {
        console.log(error);
        return error;
    } 
    else {
        return data;
    }
}

export async function updateCourse({ id, name, credits, grade }: courseInfo) {

    const { data, error } = await supabase
        .from('courses')
        .update({
            name: name, 
            credits: credits,
            grade: grade
        })
        .eq("id", id);

    if (error) {
        console.log(error);
    } else {
        return data;
    }
}

export async function deleteSemester({ id }: semInfo) {

    const { data, error } = await supabase
        .from('semesters')
        .delete()
        .eq("id", id);

    if (error) {
        console.log(error);
    } else {
        return data;
    }
}

export async function deleteCourse({ id }: courseInfo) {

    const { data, error } = await supabase
        .from('courses')
        .delete()
        .eq("id", id);

    if (error) {
        console.log(error);
    } else {
        return data;
    }
}