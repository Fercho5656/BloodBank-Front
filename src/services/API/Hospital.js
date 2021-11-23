const HOSPITAL_ENDPOINT = "https://192.168.1.1:5001/api/Hospital";
const CONTACT_INFO_ENDPOINT = "https://192.168.1.1:5001/api/ContactInfo";

export const getHospitals = async () => {
  try {
    const response = await fetch(HOSPITAL_ENDPOINT);
    if (!response.ok) throw new Error("Error: ", response.error);

    const { $values } = await response.json();

    return $values.map((value) => {
      const { contactInfo } = value;

      //Removing $id, id and country from obj
      // eslint-disable-next-line no-unused-vars
      const { $id, id, country, ...hospitalContactInfo } = contactInfo;
      return {
        id: value.id,
        name: value.name,
        contactInfoId: id,
        ...hospitalContactInfo,
      };
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getHospital = async (id) => {
  try {
    const response = await fetch(`${HOSPITAL_ENDPOINT}/${id}`);
    if (!response.ok) throw new Error("Error: ", response.error);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const addHospital = async (formData) => {
  try {
    //Sending Contact Info
    const contactInfoResponse = await fetch(CONTACT_INFO_ENDPOINT, {
      method: "POST",
      headers: {
        Application: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        postalCode: formData.postalCode + "",
      }),
    });
    if (!contactInfoResponse.ok)
      throw new Error("error", contactInfoResponse.error);

    //Sending Hospital Info
    const contactInfoResponseJSON = await contactInfoResponse.json();
    const contactInfoId = contactInfoResponseJSON.id;
    const hospitalResponse = await fetch(HOSPITAL_ENDPOINT, {
      method: "POST",
      headers: {
        Application: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        contactInfoId,
      }),
    });
    if (!hospitalResponse.ok) throw new Error("error", hospitalResponse.error);

    //Returning data
    const hospitalResponseJson = await hospitalResponse.json();
    const hospitalId = hospitalResponseJson.id;

    //Removing country from object (maybe i should delete that col. in database)
    // eslint-disable-next-line no-unused-vars
    const { ["country"]: country, ...hospitalRow } = formData;
    return { id: hospitalId, contactInfoId, ...hospitalRow };
  } catch (error) {
    console.error(error);
  }
};

export const editHospital = async (hospitalId, contactInfoId, formData) => {
  try {
    //Updating hospital info
    const hospitalResponse = await fetch(`${HOSPITAL_ENDPOINT}/${hospitalId}`, {
      method: "PUT",
      headers: {
        Application: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        contactInfoId,
      }),
    });
    if (!hospitalResponse.ok)
      throw new Error("Error: ", hospitalResponse.error);

    //Updating ContactInfo
    const contactInfoResponse = await fetch(
      `${CONTACT_INFO_ENDPOINT}/${contactInfoId}`,
      {
        method: "PUT",
        headers: {
          Application: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          postalCode: formData.postalCode + "",
        }),
      }
    );
    if (!contactInfoResponse.ok)
      throw new Error("Error: ", contactInfoResponse.error);

    //Returning data
    // eslint-disable-next-line no-unused-vars
    const { country, ...hospitalRow } = formData;
    return hospitalRow;
  } catch (error) {
    console.error("Error; ", error);
  }
};

export const deleteHospital = async (id) => {
  try {
    const response = await fetch(`https://localhost:5001/api/Hospital/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("error", response.error);
  } catch (error) {
    console.error("Error: ", error);
  }
};
