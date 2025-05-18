import { reactive, ref, watch } from "vue";

export async function loadLocale(locale, supportedLocales) {
  const localeData = supportedLocales[locale];
  return typeof localeData === "function"
    ? (await localeData()).default
    : localeData;
}

export function useI18n(storage, initialLocale, emitter, supportedLocales) {
  const { getStore, setStore } = storage;
  const translations = ref({});
  const supportedL = reactive(supportedLocales);
  const locale = ref(getStore("locale", initialLocale));

  const changeLocale = (newLocale, defaultLocale = initialLocale) => {
    if (!supportedL[newLocale]) {
      emitter.emit("vf-toast-push", {
        label: `Locale "${newLocale}" is not available.`,
        type: "error",
      });
      return;
    }

    loadLocale(newLocale, supportedL)
      .then((i18n) => {
        translations.value = i18n;
        setStore("locale", newLocale);
        setStore("translations", i18n);
        locale.value = newLocale;

        emitter.emit("vf-language-saved");
      })
      .catch((e) => {
        if (defaultLocale && newLocale !== defaultLocale) {
          //   emitter.emit("vf-toast-push", {
          //     label: `Locale "${newLocale}" cannot be loaded. Reverting to default.`,
          //     type: "error",
          //   });
          changeLocale(defaultLocale, null);
        } else {
          //   emitter.emit("vf-toast-push", {
          //     label: "Locale cannot be loaded!",
          //     type: "error",
          //   });
        }
      });
  };

  watch(locale, (newLocale) => {
    changeLocale(newLocale);
  });

  // if (!getStore('locale') && !supportedLocales.length) {
  //     changeLocale(initialLocale);
  // } else {
  //     translations.value = getStore('translations');
  // }
  if (supportedL && Object.keys(supportedL).length > 0) {
    changeLocale(locale.value); // всегда инициализируем выбранным языком
  } else {
    translations.value = getStore("translations") ?? {};
  }

  const addLocale = (lang, translations) => {
    supportedL[lang] = translations;
  };

  if (!getStore("locale")) {
    changeLocale(initialLocale);
  }

  const sprintf = (str, ...argv) =>
    !argv.length ? str : sprintf(str.replace("%s", argv.shift()), ...argv);

  function t(key, ...params) {
    const currentTranslations = supportedL[locale.value] || {};
    if (currentTranslations.hasOwnProperty(key)) {
      return sprintf(currentTranslations[key], ...params);
    }
    return sprintf(key, ...params);
  }

  return reactive({ t, locale });
}
