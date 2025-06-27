export function pathToBase64(path) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fetch(path)
      .then(response => response.blob())
      .then(blob => {
        fileReader.readAsDataURL(blob);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function base64ToPath(base64) {
  return new Promise((resolve, reject) => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const url = URL.createObjectURL(blob);
    resolve(url);
  });
}