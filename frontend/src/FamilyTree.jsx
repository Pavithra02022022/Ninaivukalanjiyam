import React from 'react';

// குடும்ப உறுப்பினர்களின் விவரங்கள் (இதை உங்கள் குடும்பத்திற்கு ஏற்ப மாற்றிக்கொள்ளலாம்)
const familyData = {
  year: "2024",
  familyTitle: "பழனி ரோசக்கவுண்டனூர் பூர்வீகமாக கொண்ட மாரிமுத்து ஆசாரி பரம்பரை",
  rootCouple: {
    husband: { name: "மூத்தவர் பெயர்", role: "தலைமுறை 1", photo: "https://placeholder.com" },
    wife: { name: "மனைவி பெயர்", role: "தலைமுறை 1", photo: "https://placeholder.com" },
  },
  children: [
    {
      husband: { name: "மகன் 1", role: "தலைமுறை 2", photo: "https://placeholder.com" },
      wife: { name: "மருமகள் 1", role: "தலைமுறை 2", photo: "https://placeholder.com" },
      subChildren: [
        {
          husband: { name: "பேரன் 1", role: "தலைமுறை 3", photo: "https://placeholder.com" },
          wife: { name: "பேத்தி 1", role: "தலைமுறை 3", photo: "https://placeholder.com" },
          subChildren: [
            {
              husband: { name: "கொள்ளுப்பேரன் 1", role: "தலைமுறை 4", photo: "https://placeholder.com" },
              wife: null,
            }
          ]
        },
        {
          husband: { name: "பேரன் 2", role: "தலைமுறை 3", photo: "https://placeholder.com" },
          wife: null,
        }
      ]
    },
    {
      husband: { name: "மகன் 2", role: "தலைமுறை 2", photo: "https://placeholder.com" },
      wife: { name: "மருமகள் 2", role: "தலைமுறை 2", photo: "https://placeholder.com" },
      subChildren: [
        {
          husband: { name: "பேரன் 3", role: "தலைமுறை 3", photo: "https://placeholder.com" },
          wife: { name: "பேத்தி 2", role: "தலைமுறை 3", photo: "https://placeholder.com" },
        }
      ]
    },
    {
      husband: null,
      wife: { name: "மகள் 1", role: "தலைமுறை 2", photo: "https://placeholder.com" },
      subChildren: []
    }
  ]
};

// தனிநபர் கார்டு (நீலம் அல்லது சாம்பல் பெட்டி)
const PersonCard = ({ person, isMale }) => {
  if (!person) return null;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isMale ? '#2563eb' : '#71717a',
      color: '#ffffff',
      borderRadius: '4px',
      padding: '4px 8px',
      minWidth: '125px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      border: '1px solid rgba(0,0,0,0.1)'
    }}>
      <img
        src={person.photo}
        alt={person.name}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '3px',
          objectFit: 'cover',
          marginRight: '6px',
          backgroundColor: '#e5e7eb'
        }}
      />
      <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{person.name}</div>
        <div style={{ fontSize: '9px', opacity: 0.9 }}>{person.role}</div>
      </div>
    </div>
  );
};

// தம்பதியர் இணைப்பு (கணவன் + மனைவி)
const CoupleNode = ({ husband, wife }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <PersonCard person={husband} isMale={true} />
    {husband && wife && (
      <div style={{ width: '10px', height: '2px', backgroundColor: '#f59e0b' }} />
    )}
    <PersonCard person={wife} isMale={false} />
  </div>
);

// கிளைகளை அடுக்கும் பகுதி (Recursive Tree Branch)
const TreeBranch = ({ node }) => {
  const hasChildren = node.subChildren && node.subChildren.length > 0;
  return (
    <div style={{ marginBottom: '12px' }}>
      <CoupleNode husband={node.husband} wife={node.wife} />
      {hasChildren && (
        <div style={{
          marginLeft: '18px',
          paddingLeft: '14px',
          borderLeft: '2px solid #f59e0b',
          marginTop: '8px'
        }}>
          {node.subChildren.map((child, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-14px',
                top: '16px',
                width: '14px',
                height: '2px',
                backgroundColor: '#f59e0b'
              }} />
              <TreeBranch node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function FamilyTree() {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '3px solid #3b82f6',
      borderRadius: '8px',
      padding: '20px',
      overflowX: 'auto',
      position: 'relative',
      minHeight: '500px',
      fontFamily: 'sans-serif'
    }}>
      {/* மேல் இடதுபுறம் உள்ள 2024 பேட்ஜ் */}
      <div style={{
        display: 'inline-block',
        backgroundColor: '#92400e',
        color: '#fef3c7',
        padding: '6px 22px',
        borderRadius: '50%',
        fontWeight: 'bold',
        fontSize: '14px',
        border: '2px solid #d97706',
        marginBottom: '10px'
      }}>
        {familyData.year}
      </div>

      {/* முதல் தலைமுறை (Root Couple) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <CoupleNode
          husband={familyData.rootCouple.husband}
          wife={familyData.rootCouple.wife}
        />
        {/* கீழே செல்லும் ஆரஞ்சு கோடு */}
        <div style={{ width: '2px', height: '24px', backgroundColor: '#f59e0b' }} />
      </div>

      {/* இரண்டாம் தலைமுறை மற்றும் அதன் கிளைகள் */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        gap: '24px',
        borderTop: '2px solid #f59e0b',
        paddingTop: '16px',
        minWidth: '750px'
      }}>
        {familyData.children.map((branch, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <TreeBranch node={branch} />
          </div>
        ))}
      </div>

      {/* கீழ் வலதுபுறம் உள்ள பூர்வீகப் பெயர் பலகை */}
      <div style={{
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <div style={{
          backgroundColor: '#854d0e',
          color: '#fef9c3',
          padding: '12px 20px',
          borderRadius: '6px',
          border: '2px solid #ca8a04',
          maxWidth: '280px',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          {familyData.familyTitle}
        </div>
      </div>
    </div>
  );
}
