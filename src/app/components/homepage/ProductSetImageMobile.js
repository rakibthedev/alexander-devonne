
export default async function ProductSetImageMobile({ imageId }) {
    let imgSrc = '';
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/product-set/get-wp-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mediaId: imageId }),
        });
        
        if (response.ok) {
          const data = await response.json() || [];
          // Assuming `guid.rendered` contains the image URL
         imgSrc = await data.data.guid?.rendered || '';

        } else {
          console.error('Error fetching image:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }


  return (
    <div>
      {imgSrc && (
        <div 
        className="block min-h-[450px] md:hidden w-full"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top',
          backgroundSize: 'cover',
        }}
      />
      )}
    </div>
  );
}
