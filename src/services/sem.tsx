import { supabase } from "@/lib/supabaseClient";

export async function addSemester(name : string) {

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