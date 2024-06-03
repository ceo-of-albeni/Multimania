import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./createidea.scss";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateIdea() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [coauthors, setCoauthors] = useState("");
  const [text, setText] = useState("");
  const [articleFile, setArticleFile] = useState(null);
  const [coauthorsEmails, setCoauthorsEmails] = useState("");

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="article_form" id="article_div">
            <h4>{t("tableadmin.title")}</h4>
            <div className="article_form-inputs">
              <div className="short_inp">
                <p className="input_p">{t("tableadmin.article_title")}</p>
                <input
                  className="text_input"
                  placeholder={t("tableadmin.ph")}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="input_p">{t("tableadmin.category")}</p>
                <p className="input_p">{t("tableadmin.author")}</p>
                <input
                  className="text_input"
                  placeholder={t("tableadmin.ph")}
                  type="text"
                  value={coauthors}
                  onChange={(e) => setCoauthors(e.target.value)}
                />

                <p className="input_p">{t("tableadmin.email")}</p>
                <input
                  className="text_input"
                  placeholder={t("tableadmin.ph")}
                  type="text"
                  value={coauthorsEmails}
                  onChange={(e) => setCoauthorsEmails(e.target.value)}
                />

                <p className="input_p">{t("tableadmin.file")}</p>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    // accept=""
                    // onChange={handleFileChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                </label>

                <p className="input_p input_p-text">{t("tableadmin.text")}</p>
                <input
                  className="text_input"
                  placeholder={t("tableadmin.ph")}
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <br />
              {/* <button onClick={handleUpload}>{t('userprofilepage.next')}</button>
              <p id="clear_all" onClick={clearAll}>
                {t('userprofilepage.clear')}
              </p> */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

// <div className="article_form" id="article_div">
//             <h4>{t('tableadmin.title')}</h4>
//             <div className="article_form-inputs">
//               <div className="short_inp">
//                 <p className="input_p">{t('tableadmin.article_title')}</p>
//                 <input
//                   className="text_input"
//                   placeholder={t('tableadmin.ph')}
//                   type="text"
//                   value={title}
//                   onChange={e => setTitle(e.target.value)}
//                 />
//                 <p className="input_p">{t('tableadmin.category')}</p>
//                 <FormControl sx={{ m: 1, minWidth: 120, height: "49px" }}>
//                   <Select
//                     className="text_input max_mb"
//                     style={{
//                       height: "49px",
//                       marginBottom: "120px",
//                     }}
//                     value={category}
//                     onChange={handleChange}
//                     displayEmpty
//                     inputProps={{ "aria-label": "Without label" }}>
//                     <MenuItem value="">
//                       <p style={{ color: "lightgrey", marginBottom: "0px" }}>
//                         {t('tableadmin.category2')}
//                       </p>
//                     </MenuItem>
//                     {categories ? (
//                       categories.map(item => (
//                         <MenuItem key={item.id} value={item.name}>
//                           {item.name}
//                         </MenuItem>
//                       ))
//                     ) : (
//                       <h3>{t('tableadmin.loading')}</h3>
//                     )}
//                   </Select>
//                 </FormControl>
//                 <p className="input_p">
//                   {t('tableadmin.author')}
//                 </p>
//                 <input
//                   className="text_input"
//                   placeholder={t("tableadmin.ph")}
//                   type="text"
//                   value={coauthors}
//                   onChange={e => setCoauthors(e.target.value)}
//                 />

//                 <p className="input_p">{t('tableadmin.email')}</p>
//                 <input
//                   className="text_input"
//                   placeholder={t('tableadmin.ph')}
//                   type="text"
//                   value={coauthorsEmails}
//                   onChange={e => setCoauthorsEmails(e.target.value)}
//                 />

//                 <p className="input_p">{t('tableadmin.file')}</p>
//                 <label className="custom-file-upload">
//                   <input
//                     type="file"
//                     // accept=""
//                     onChange={handleFileChange}
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     height="1em"
//                     viewBox="0 0 640 512">
//                     <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
//                   </svg>
//                 </label>

//                 <p className="input_p input_p-text">{t("tableadmin.text")}</p>
//                 <input
//                   className="text_input"
//                   placeholder={t("tableadmin.ph")}
//                   type="text"
//                   value={text}
//                   onChange={e => setText(e.target.value)}
//                 />
//               </div>

//               <br />
//               <button onClick={handleUpload}>{t('userprofilepage.next')}</button>
//               <p id="clear_all" onClick={clearAll}>
//                 {t('userprofilepage.clear')}
//               </p>
//             </div>
//           </div>
