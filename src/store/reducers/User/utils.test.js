// https://github.com/marak/Faker.js/
import { deepClone, capitalize } from 'utils';
import { mergeManifestWithForm } from './utils';
import { DEFAULT_STATE } from './reducer';
import { date, commerce, company, image, internet, datatype, lorem, random } from 'faker';
const { productName, productDescription } = commerce;
const { catchPhraseDescriptor } = company;
const { imageUrl } = image;
const { url } = internet;
const { datetime, number, string, json, array } = datatype;
const {
  float,
  arrayElement,
  arrayElements,
  objectElement,
  uuid,
  boolean,
  word,
  words,
  locale,
  alpha,
  alphaNumeric,
  hexaDecimal
} = random;

const generateRandomData = () => {
  const pwaUrl = url();
  const pwaTagOne = capitalize(word());
  const pwaTagTwo = capitalize(word());
  const pwaTags = [pwaTagOne, pwaTagTwo];
  const newState = deepClone({
    ...DEFAULT_STATE,
    pwaToUpload: {
      ...DEFAULT_STATE.pwaToUpload,
      form: {
        ...DEFAULT_STATE.pwaToUpload.form,
        url: { ...DEFAULT_STATE.pwaToUpload.form.url, value: pwaUrl },
        tags: { ...DEFAULT_STATE.pwaToUpload.form.tags, options: pwaTags }
      }
    }
  });
  const manifestUrl = `${imageUrl()}/manifest.json`;
  const pwaName = productName();
  const pwaShortName = productName();
  const pwaDescription = catchPhraseDescriptor();
  const pwaKeywords = words(5)
    .split(' ')
    .map((w) => capitalize(w))
    .concat([pwaTagOne]);
  const pwaCategories = words(5)
    .split(' ')
    .map((w) => capitalize(w))
    .concat(pwaTags);
  const pwaIconOne = {
    src: imageUrl(),
    sizes: `${number({ min: 0, max: 144, precision: 0 })}x${number({ min: 0, max: 144, precision: 0 })}`,
    type: 'image/png'
  };
  const pwaIconTwo = {
    src: imageUrl(),
    sizes: `${number({ min: 145, max: 512, precision: 0 })}x${number({ min: 145, max: 512, precision: 0 })}`,
    type: 'image/png'
  };
  const manifestJson = {
    name: pwaName,
    short_name: pwaShortName,
    description: pwaDescription,
    keywords: pwaKeywords,
    categories: pwaCategories,
    icons: [pwaIconOne, pwaIconTwo]
  };

  const { form } = newState.pwaToUpload;

  const expected = deepClone({
    ...form,
    name: { ...form.name, value: pwaShortName || pwaName },
    slug: { ...form.slug, placeholder: (pwaShortName || pwaName)?.toLowerCase().split(' ').join('-') },
    description: { ...form.description, value: pwaDescription },
    tags: { ...form.tags, value: pwaTags },
    manifest_url: {
      ...form.manifest_url,
      placeholder: pwaUrl.replace(/\/(?=[^\/]*$)/, '/manifest.json') || 'https://pwa.com/manifest.json',
      value: manifestUrl,
      disabled: manifestUrl ? true : false
    },
    manifest_json: { ...form.manifest_json, value: manifestJson, disabled: true },
    image_url: { ...form.image_url, value: manifestUrl?.replace('manifest.json', pwaIconTwo.src) || '' }
  });

  return {
    newState,
    manifestUrl,
    manifestJson,
    expected
  };
};

describe('User reducer mergeManifestWithForm util', () => {
  it('should merge the manifest found with lighthouse correclt with the Pwaform', () => {
    const newState = deepClone({
      ...DEFAULT_STATE,
      pwaToUpload: {
        ...DEFAULT_STATE.pwaToUpload,
        form: {
          ...DEFAULT_STATE.pwaToUpload.form,
          url: { ...DEFAULT_STATE.pwaToUpload.form.url, value: 'https://pwa.com/' },
          tags: { ...DEFAULT_STATE.pwaToUpload.form.tags, options: ['Themed', 'Offline'] }
        }
      }
    });
    const { form } = newState.pwaToUpload;
    const manifestUrl = 'https://pwa.com/manifest.json';
    const manifestJson = {
      manifest_version: 3,
      version: '3.0.0',
      version_name: '1.0.0 beta',
      name: 'Pwa Store',
      short_name: 'Pwa Store',
      description: 'Discover the future of progressive web apps',
      keywords: ['react', 'redux', 'pwa', 'store', 'free', 'django'],
      categories: ['tools', 'store', 'free', 'themed', 'offline'],
      icons: [
        {
          src: 'assets/android-chrome-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'assets/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'assets/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'assets/icon.png',
          sizes: '1500x1500',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    };
    const result = mergeManifestWithForm(newState, manifestUrl, manifestJson);
    const expected = {
      ...form,
      name: { ...form.name, value: 'Pwa Store' },
      slug: { ...form.slug, placeholder: 'pwa-store' },
      description: { ...form.description, value: 'Discover the future of progressive web apps' },
      tags: { ...form.tags, value: ['Themed', 'Offline'] },
      manifest_url: {
        ...form.manifest_url,
        placeholder: `https://pwa.com/manifest.json`,
        value: manifestUrl,
        disabled: true
      },
      manifest_json: { ...form.manifest_json, value: manifestJson, disabled: true },
      image_url: { ...form.image_url, value: 'https://pwa.com/assets/icon.png' }
    };
    expect(result).toMatchObject(expected);
  });
});

const LENGTH_OF_TESTS_ARRAY = 50;

describe('User reducer mergeManifestWithForm util automated tests', () => {
  const runTest = ({ newState, manifestUrl, manifestJson, expected }, testNumber) => {
    const testNamePrefix = `Test ${testNumber}`;
    return it(`${testNamePrefix} for the manifest url ${manifestUrl}`, () => {
      const result = mergeManifestWithForm(newState, manifestUrl, manifestJson);

      expect(result).toMatchObject(expected);
    });
  };

  const Tests = new Array(LENGTH_OF_TESTS_ARRAY).fill().map((t) => generateRandomData());

  Tests.forEach((test, i) => runTest(test, i));
});
