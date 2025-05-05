const PROJECTS: {
  name: string
  description: string
  previewImage: string
  repoUrl: string
  liveLink: string
  codeSnippet: string
}[] = [
  {
    name: 'CASE REACT CHANNEL',
    description: 'Case ini merupakan fitur dari bot WhatsApp yang dirancang untuk memberikan reaksi emoji ke sebuah pesan di channel WhatsApp secara otomatis. Pengguna hanya perlu memasukkan link channel lengkap beserta ID pesan, lalu menambahkan emoji yang diinginkan. Kode ini memverifikasi validitas link, memisahkan ID channel dan ID pesan dari URL, lalu mengeksekusi fungsi async untuk mengambil metadata channel dengan `sock.newsletterMetadata` dan mengirimkan reaksi menggunakan `sock.newsletterReactMessage`. Semua validasi dilakukan secara berurutan untuk memastikan input yang diterima benar, dan jika terjadi kesalahan, bot akan membalas dengan pesan error yang informatif.',
    liveLink: 'https://google.com',
    previewImage: '/project1.png',
    repoUrl: 'https://whatsapp.com/channel/0029VagHmBsKGGGR4PPqnr20',
    codeSnippet: `case "reactionch":
case "reactch": {
  try {
      
    if (!text || !args[0]) 
      return reply("Contoh penggunaan:\\n.reactch https://whatsapp.com/channel/xxx/yyy ❤️");

    if (!args[0].startsWith("https://whatsapp.com/channel/")) 
      return reply("Link tautan tidak valid.");

    let urlParts = args[0].split('/');
    if (urlParts.length < 6) 
      return reply("Link channel tidak lengkap. Pastikan ada ID pesan di akhir URL.");

    let result = urlParts[4];
    let serverId = urlParts[5];

    if (!result || !serverId) 
      return reply("Gagal membaca link. Periksa kembali link channel yang kamu masukkan.");

    // Ambil emoji setelah link
    let emoji = text.replace(args[0], "").trim();
    if (!emoji) 
      return reply("Harap masukkan emoji setelah link.");

    let res = await sock.newsletterMetadata("invite", result);
    await sock.newsletterReactMessage(res.id, serverId, emoji);

    return reply(\\\`Berhasil mengirim reaction:\\n\${emoji}\\nKe channel: \${res.name}\\\`);
    
  } catch (err) {
    console.log("Error reactionch:", err);
    return reply("Gagal mengirim reaction. Link atau emoji mungkin tidak valid, atau terjadi kesalahan pada sistem.");
  }
}
break;
`,
  },
  {
  name: 'CASE TIKTOK DOWNLOADER',
  description: 'Case ini memungkinkan pengguna untuk mengunduh video dari TikTok melalui API pihak ketiga (tikwm.com). Menggunakan library axios, fungsi tiktokDl melakukan request HTTP POST ke endpoint TikWM, lalu mengambil data seperti URL video tanpa watermark, metadata lagu, statistik video, dan info pembuat konten. Outputnya disusun dalam format JSON yang mudah digunakan kembali di aplikasi WhatsApp Bot atau platform lain.',
  liveLink: 'https://google.com',
  previewImage: '/project2.png',
  repoUrl: 'https://whatsapp.com/channel/0029VagHmBsKGGGR4PPqnr20',
  codeSnippet: `// -------------------- [IMPORT MODULE] --------------------
const axios = require('axios');

// -------------------- [FUNGSI TIKTOK DOWNLOADER] --------------------
async function tiktokDl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];

      function formatNumber(integer) {
        let numb = parseInt(integer);
        return Number(numb).toLocaleString().replace(/,/g, '.');
      }

      function formatDate(n, locale = 'id-ID') {
        let d = new Date(n * 1000);
        return d.toLocaleDateString(locale, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
      }

      let response = await axios.post('https://www.tikwm.com/api/', {}, {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Origin': 'https://www.tikwm.com',
          'Referer': 'https://www.tikwm.com/',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest'
        },
        params: {
          url: url,
          count: 12,
          cursor: 0,
          web: 1,
          hd: 1
        }
      });

      let res = response.data.data;

      if (!res.size && !res.wm_size && !res.hd_size) {
        res.images.map(v => data.push({ type: 'photo', url: v }));
      } else {
        if (res.wmplay) data.push({ type: 'watermark', url: 'https://www.tikwm.com' + res.wmplay });
        if (res.play) data.push({ type: 'nowatermark', url: 'https://www.tikwm.com' + res.play });
        if (res.hdplay) data.push({ type: 'nowatermark_hd', url: 'https://www.tikwm.com' + res.hdplay });
      }

      let json = {
        status: true,
        title: res.title,
        taken_at: formatDate(res.create_time),
        region: res.region,
        id: res.id,
        durations: res.duration,
        duration: res.duration + ' Seconds',
        cover: 'https://www.tikwm.com' + res.cover,
        size_wm: res.wm_size,
        size_nowm: res.size,
        size_nowm_hd: res.hd_size,
        data: data,
        music_info: {
          id: res.music_info.id,
          title: res.music_info.title,
          author: res.music_info.author,
          album: res.music_info.album || null,
          url: 'https://www.tikwm.com' + (res.music || res.music_info.play)
        },
        stats: {
          views: formatNumber(res.play_count),
          likes: formatNumber(res.digg_count),
          comment: formatNumber(res.comment_count),
          share: formatNumber(res.share_count),
          download: formatNumber(res.download_count)
        },
        author: {
          id: res.author.id,
          fullname: res.author.unique_id,
          nickname: res.author.nickname,
          avatar: 'https://www.tikwm.com' + res.author.avatar
        }
      };

      resolve(json);
    } catch (err) {
      reject(err);
    }
  });
}

// -------------------- [CASE TIKTOK BOT] --------------------
case 'tiktok':
case 'tiktokdown':
case 'ttdown':
case 'ttdl':
case 'tt':
case 'ttmp4':
case 'ttvideo':
case 'tiktokmp4':
case 'tiktokvideo': {

  if (!text) return reply(\`*< / >* Contoh: tt https://vt.tiktok.com/ZSrvqy8fy/\`);
  if (!text.includes('tiktok.com')) return reply('Url Tidak Mengandung Result Dari TikTok!');

  try {
    reply(mess.wait); // Bisa diganti teks biasa jika mess.wait belum tersedia

    // ------------------ [REAKSI EMOJI LOADING] ------------------
    const reactEmojis = ["⏳", "🕛", "🕒", "🕕", "🕘", "🕛", "✅"];
    for (const emoji of reactEmojis) {
      await sock.sendMessage(m.chat, {
        react: { text: emoji, key: m.key }
      });
    }

    const hasil = await tiktokDl(text);

    if (hasil && hasil.size_nowm) {
      await sock.sendFileUrl(
        m.chat,
        hasil.data[1].url,
        \`*📍Title:* \${hasil.title}\n*⏳Duration:* \${hasil.duration}\n*🎃Author:* \${hasil.author.nickname} (@\${hasil.author.fullname})\`,
        m
      );

      await sock.sendMessage(m.chat, {
        react: { text: '🎵', key: m.key }
      });
    } else {
      for (let i = 0; i < hasil.data.length; i++) {
        await sock.sendFileUrl(
          m.chat,
          hasil.data[i].url,
          \`*🚀Image:* \${i + 1}\`,
          m
        );
      }
    }
  } catch (e) {
    console.error(e);
    reply('Gagal/Url tidak valid!');
  }
}
break;`,
},
{
  name: 'CASE TIKTOK STALK',
  description: 'Case ini berfungsi untuk mengambil data profil pengguna TikTok hanya dengan memasukkan username saja. Fitur ini menampilkan informasi lengkap seperti nama pengguna, username, bio (signature), jumlah pengikut (followers), jumlah mengikuti (following), total likes, jumlah video, asal wilayah (region), hingga status verifikasi. Sangat cocok digunakan untuk keperluan stalking akun TikTok secara cepat dan praktis.',
  liveLink: 'https://your-link-preview.com',
  previewImage: '/tiktokstalk-preview.png',
  repoUrl: 'https://whatsapp.com/channel/0029VagHmBsKGGGR4PPqnr20',
  codeSnippet: `case 'tiktokstalk':
case 'ttstalk':
case 'tiktokprofile':
case 'ttprofile': {
     
	if (!text) {
		console.log('Username TikTok tidak diberikan.');
		return reply('*< / >* Contoh: ' + prefix + command + ' username_tiktok');
	}
	try {
		reply(mess.wait);

		// Emoji yang akan digunakan
		const reactEmojis = ["⏳", "🕛", "🕒", "🕕", "🕘", "🕛", "✅"];

		// Mengirimkan reaksi secara berurutan
		for (const emoji of reactEmojis) {
			await sock.sendMessage(m.chat, {
				react: {
					text: emoji,
					key: m.key
				}
			});
		}

		console.log('Mengambil data profil TikTok untuk username:', text);
		const url = \`https://api.tiklydown.eu.org/api/stalk?user=\${text}\`;
		const response = await fetch(url);
		const data = await response.json();
		if (data.status === 200 && data.data && data.data.user) {
			const user = data.data.user;
			const stats = data.data.stats;
			const profileMessage = \`*Nama:* \${user.nickname}\\n*Username:* @\${user.uniqueId}\\n*Bio:* \${user.signature || 'Tidak ada bio'}\\n*Pengikut:* \${stats.followerCount}\\n*Mengikuti:* \${stats.followingCount}\\n*Suka:* \${stats.heartCount}\\n*Video:* \${stats.videoCount}\\n*Wilayah:* \${user.region}\\n*Terverifikasi:* \${user.verified ? 'Ya' : 'Tidak'}\`;
			reply(profileMessage)
		} else {
			console.log('Gagal mengambil data profil TikTok.');
			reply('Gagal mengambil profil TikTok atau username tidak valid.');
		}
	} catch (e) {
		console.error('Terjadi kesalahan saat mengambil profil TikTok:', e);
		reply('Terjadi kesalahan saat mengambil data profil. Silakan coba lagi nanti.');
	}
	break;
}`
},
{
  name: 'CASE GITCLONE',
  description: 'Case ini memungkinkan untuk mengunduh repository dari GitHub hanya dengan menggunakan URL repository. Fitur ini akan mendownload repo sebagai file zip dan mengirimkannya ke pengguna.',
  liveLink: 'https://github.com/nazedev/hitori',
  previewImage: '/gitclone-preview.png',
  repoUrl: 'https://github.com/yourusername/yourrepo',
  codeSnippet: `case 'git':
case 'gitclone': {
  if (!args[0]) return reply(\`*< / >* Contoh: \\\${prefix + command} https://github.com/Galangxyz/website\`);
  if (!isUrl(args[0]) || !args[0].includes('github.com')) return reply('Gunakan URL GitHub yang valid!');

  let match = args[0].match(/github\\.com\\/([^\\/]+)\\/([^\\/]+)(?:\\/$|$)/i);
  if (!match) return reply('URL GitHub tidak valid!');

  let [, user, repo] = match;
  repo = repo.replace(/\\.git$/, ''); // hapus .git di akhir jika ada

  try {
    reply(\`Sedang mendownload repo *\\\${repo}* dari GitHub... mohon tunggu.\`);

    await sock.sendMessage(m.chat, {
      document: {
        url: \`https://api.github.com/repos/\\\${user}/\\\${repo}/zipball\`
      },
      fileName: \`\\\${repo}.zip\`,
      mimetype: 'application/zip'
    }, { quoted: m });

    // optional: kirim notifikasi selesai
    reply(\`Berhasil mengirim repository *\\\${repo}*!\`);
  } catch (e) {
    console.error('Gagal kirim dokumen:', e);
    reply('Gagal mendownload repository dari GitHub!');
  }
  break;
}`
},

{
  name: 'Coming Soon ???',
  description: 'Coming Soon??? ',
  liveLink: 'https://your-link-preview.com',
  previewImage: '/tiktokstalk-preview.png',
  repoUrl: 'https://whatsapp.com/channel/0029VagHmBsKGGGR4PPqnr20',
  codeSnippet: `Coming Soon ???`
},
]

export default PROJECTS