import * as Yup from 'yup';
import { emailRegex, slugRegex, urlRegex, youtubeEmbedUrlRegex } from '../../../shared/regex';

export type T_YupSchema = { [key: string]: Yup.StringSchema };
export const setYupLocales = () => {
    const locales = {
        "notFound": ".صفحه مورد نظر یافت نشد",
        "forbidden": "شما اجازه دسترسی به این صفحه را ندارید.",
        "invalidData": "اطلاعات نامعتبر میباشد",
        "invalidEmail": "ایمیل نامعتبر میباشد",
        "required": "این فیلد اجباری میباشد",
        "enterAtLeast": "حداقل",
        "enterAtMost": "حداکثر",
        "character": "کاراکتر"
    }

    Yup.setLocale({
        mixed: {
            default: locales.invalidData,
            required: locales.required,
        },
        string: {
            matches(params) {
                console.log(params.regex);

                switch (params.regex.toString()) {
                    case emailRegex.toString():
                        return locales.invalidEmail;
                
                    case slugRegex.toString():
                        return "آدرس دوستانه باید فاقد فضای خالی (space) باشد";
                
                    case urlRegex.toString():
                        return "google.com, http://www.google.com, http://google.com ساختار آدرس (url) باید صحیح باشد";
                    
                    case youtubeEmbedUrlRegex.toString():
                        return "ساختار آدرس ";
                }
            },
            email: locales.invalidEmail,
            max(params) {
                return `${locales.enterAtMost} ${params.max} ${locales.character}`
            },
            min(params) {
                return `${locales.enterAtLeast} ${params.min} ${locales.character}`
            },
        }
    })
}